import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import styles from "./tree-view.module.css";

const rowHeight = 38;
const still = { duration: 0 };
const fadeIn = { duration: 0.16, ease: "easeOut" };
const fadeOut = { duration: 0.1, ease: "easeIn" };
const smoothSpring = { type: "spring", stiffness: 260, damping: 30 };
const snappySpring = { type: "spring", stiffness: 500, damping: 32 };
const blur = (amount) => `blur(${amount}px)`;

function flatten(nodes, expanded, depth = 1, parentId) {
    return nodes.flatMap((node, index) => [
        { node, depth, parentId, position: index + 1, setSize: nodes.length },
        ...(node.children && expanded.has(node.id)
            ? flatten(node.children, expanded, depth + 1, node.id)
            : []),
    ]);
}

function fileTone(label) {
    const name = label.toLowerCase();
    if (name.endsWith(".tsx") || name.endsWith(".ts")) return styles.typescript;
    if (name.endsWith(".css")) return styles.stylesheet;
    if (name.endsWith(".md")) return styles.markdown;
    if (name.endsWith(".json")) return styles.json;
    return styles.file;
}

function FolderIcon({ open, reduced }) {
    return (
        <AnimatePresence initial={false} mode="popLayout">
            <motion.span
                key={open ? "open" : "closed"}
                className={styles.folderGlyph}
                initial={reduced ? false : { opacity: 0, scale: 0.6, filter: blur(4) }}
                animate={{ opacity: 1, scale: 1, filter: blur(0) }}
                exit={reduced ? { opacity: 0, transition: still } : {
                    opacity: 0,
                    scale: 0.6,
                    filter: blur(4),
                    transition: fadeOut,
                }}
                transition={reduced ? still : { ...snappySpring, opacity: fadeIn, filter: fadeIn }}
            >
                {open ? <FolderOpen size={16} strokeWidth={1.7} /> : <Folder size={16} strokeWidth={1.7} />}
            </motion.span>
        </AnimatePresence>
    );
}

export function TreeView({
    nodes,
    defaultExpandedIds = [],
    expandedIds,
    onExpandedChange,
    onSelect,
    "aria-label": ariaLabel = "File tree",
}) {
    const reduced = useReducedMotion() ?? false;
    const selectionLayoutId = `tree-selection-${useId()}`;
    const [internalExpanded, setInternalExpanded] = useState(() => new Set(defaultExpandedIds));
    const [focusedId, setFocusedId] = useState(nodes[0]?.id ?? null);
    const [selectedId, setSelectedId] = useState(null);
    const [openedId, setOpenedId] = useState(null);
    const refs = useRef(new Map());
    const expanded = expandedIds ? new Set(expandedIds) : internalExpanded;
    const visible = flatten(nodes, expanded);
    const focusableId = visible.some(({ node }) => node.id === focusedId)
        ? focusedId
        : (visible[0]?.node.id ?? null);
    const openedIndex = visible.findIndex(({ node }) => node.id === openedId);

    function setExpanded(next) {
        if (!expandedIds) setInternalExpanded(next);
        onExpandedChange?.([...next]);
    }

    function toggle(node) {
        if (!node.children?.length) return;
        const next = new Set(expanded);
        if (next.has(node.id)) {
            next.delete(node.id);
        } else {
            next.add(node.id);
            setOpenedId(node.id);
        }
        setExpanded(next);
    }

    function focus(id) {
        setFocusedId(id);
        const row = refs.current.get(id);
        if (row) row.focus();
        else requestAnimationFrame(() => refs.current.get(id)?.focus());
    }

    function select(node) {
        setSelectedId(node.id);
        onSelect?.(node);
    }

    function onKeyDown(event, item, index) {
        const { node } = item;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focus(visible[Math.min(index + 1, visible.length - 1)].node.id);
            return;
        }
        if (event.key === "ArrowUp") {
            event.preventDefault();
            focus(visible[Math.max(index - 1, 0)].node.id);
            return;
        }
        if (event.key === "Home") {
            event.preventDefault();
            focus(visible[0].node.id);
            return;
        }
        if (event.key === "End") {
            event.preventDefault();
            focus(visible[visible.length - 1].node.id);
            return;
        }
        if (event.key === "ArrowRight" && node.children?.length) {
            event.preventDefault();
            if (!expanded.has(node.id)) toggle(node);
            else if (visible[index + 1]?.parentId === node.id) focus(visible[index + 1].node.id);
            return;
        }
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (node.children?.length && expanded.has(node.id)) toggle(node);
            else if (item.parentId) focus(item.parentId);
            return;
        }
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            select(node);
            if (node.children?.length) toggle(node);
        }
    }

    return (
        <div className={styles.tree} role="tree" aria-label={ariaLabel} aria-multiselectable="false">
            <AnimatePresence initial={false} mode="sync">
                {visible.map((item, index) => {
                    const hasChildren = Boolean(item.node.children?.length);
                    const isExpanded = hasChildren && expanded.has(item.node.id);
                    const isSelected = selectedId === item.node.id;
                    const delay = openedIndex >= 0 && index > openedIndex
                        ? Math.min(index - openedIndex - 1, 7) * 0.035
                        : 0;

                    return (
                        <motion.div
                            key={item.node.id}
                            className={styles.row}
                            layout={reduced ? false : "position"}
                            initial={reduced ? false : { height: 0, opacity: 0, x: -6, overflow: "hidden" }}
                            animate={{
                                height: rowHeight,
                                opacity: 1,
                                x: 0,
                                transitionEnd: { overflow: "visible" },
                                transition: reduced ? still : {
                                    height: smoothSpring,
                                    opacity: { ...fadeIn, delay },
                                    x: { ...smoothSpring, delay },
                                },
                            }}
                            exit={reduced ? { opacity: 0, transition: still } : {
                                height: 0,
                                opacity: 0,
                                x: -4,
                                overflow: "hidden",
                                pointerEvents: "none",
                                transition: { height: smoothSpring, opacity: fadeOut, x: fadeOut },
                            }}
                            transition={reduced ? still : { layout: smoothSpring }}
                        >
                            <button
                                ref={(element) => {
                                    if (element) refs.current.set(item.node.id, element);
                                    else refs.current.delete(item.node.id);
                                }}
                                type="button"
                                className={styles.item}
                                role="treeitem"
                                aria-level={item.depth}
                                aria-posinset={item.position}
                                aria-setsize={item.setSize}
                                aria-expanded={hasChildren ? isExpanded : undefined}
                                aria-selected={isSelected}
                                tabIndex={focusableId === item.node.id ? 0 : -1}
                                style={{ "--tree-depth": item.depth }}
                                onFocus={() => setFocusedId(item.node.id)}
                                onKeyDown={(event) => onKeyDown(event, item, index)}
                                onClick={() => {
                                    setFocusedId(item.node.id);
                                    select(item.node);
                                    if (hasChildren) toggle(item.node);
                                }}
                            >
                                {isSelected && (
                                    <motion.span
                                        aria-hidden="true"
                                        layoutId={selectionLayoutId}
                                        className={styles.selection}
                                        transition={reduced ? still : smoothSpring}
                                    />
                                )}
                                {item.depth > 1 && (
                                    <motion.span
                                        aria-hidden="true"
                                        className={styles.branch}
                                        initial={reduced ? false : { opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        transition={reduced ? still : { duration: 0.2, ease: "easeOut", delay }}
                                    />
                                )}
                                <motion.span
                                    className={styles.disclosure}
                                    aria-hidden="true"
                                    initial={false}
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={reduced ? still : snappySpring}
                                >
                                    {hasChildren ? <ChevronRight size={14} strokeWidth={1.9} /> : null}
                                </motion.span>
                                <span
                                    className={`${styles.icon} ${hasChildren ? styles.folder : fileTone(item.node.label)}`}
                                    aria-hidden="true"
                                >
                                    {item.node.icon ?? (hasChildren
                                        ? <FolderIcon open={isExpanded} reduced={reduced} />
                                        : <File size={16} strokeWidth={1.7} />)}
                                </span>
                                <span className={styles.label}>{item.node.label}</span>
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

export default TreeView;