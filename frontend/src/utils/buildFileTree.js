export function buildFileTree(files) {
    const root = {};

    files.forEach((file) => {
        const parts = file.path.split("/");

        let current = root;

        parts.forEach((part, index) => {
            const isFile = index === parts.length - 1;

            if (!current[part]) {
                current[part] = isFile
                    ? {
                          type: "file",
                          data: file,
                      }
                    : {
                          type: "folder",
                          children: {},
                      };
            }

            if (!isFile) {
                current = current[part].children;
            }
        });
    });

    return root;
}