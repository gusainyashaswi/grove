function StatCard({ title, value }) {
    return (
        <div className="rounded-lg border p-4">
            <p>{title}</p>
            <h2>{value}</h2>
        </div>
    );
}

export default StatCard;