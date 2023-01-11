
export default function handler(req, res) {
    try {
        const result = 'res';
        res.status(200).send({ result });
    } catch (err) {
        res.status(500).send({ error: "failed to fetch data" });
    }
}
