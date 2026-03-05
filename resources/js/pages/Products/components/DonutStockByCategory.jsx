export default function DonutStockByCategory({ products }) {
  // 1️⃣ Agrupar stock por categoría
  const stockByCategory = products.reduce((acc, p) => {
    acc[p.categorias] = (acc[p.categorias] || 0) + p.stock;
    return acc;
  }, {});

  const categories = Object.keys(stockByCategory);
  const values = Object.values(stockByCategory);

  // 2️⃣ Total de stock
  const totalStock = values.reduce((a, b) => a + b, 0);

  // 3️⃣ Colores fijos (ordenados)
  const colors = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63", "#9C27B0"];

  // 4️⃣ SVG DONA
  let cumulativePercent = 0;

  return (
    <div className="mt-8" >
      <h3>Stock por categoría</h3>

      <svg width="220" height="220" viewBox="0 0 36 36">
        {values.map((value, index) => {
          const percent = (value / totalStock) * 100;
          const dashArray = `${percent} ${100 - percent}`;
          const dashOffset = 100 - cumulativePercent;
          cumulativePercent += percent;

          return (
            <circle
              key={index}
              cx="18"
              cy="18"
              r="15.9"
              fill="transparent"
              stroke={colors[index % colors.length]}
              strokeWidth="4"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
            />
          );
        })}

        {/* TEXTO CENTRAL */}
        <text x="18" y="18" textAnchor="middle" dy="0.3em" fontSize="4">
          Stock
        </text>
      </svg>

      {/* LEYENDA */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categories.map((cat, i) => (
          <li key={cat} className="mb-1">
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: colors[i % colors.length],
                marginRight: "6px"
              }}
            />
            {cat} — {((stockByCategory[cat] / totalStock) * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}