export default function LineSalesChart({ products }) {
  if (!products || products.length === 0) return null;

  // 1️⃣ Calcular ventas acumuladas
  let acumulado = 0;
  const data = products.map(p => {
    acumulado += p.precio * p.sales;
    return acumulado;
  });

  const maxValue = Math.max(...data);

  const width = 500;
  const height = 260;
  const padding = 50;

  // 2️⃣ Calcular puntos
  const points = data.map((value, index) => {
    const x =
      padding +
      (index / (data.length - 1)) * (width - padding * 2);

    const y =
      height -
      padding -
      (value / maxValue) * (height - padding * 2);

    return { x, y, value };
  });

  return (
    <section className="mt-7">
      <h2>Venta Global Acumulada</h2>

      <svg width={width} height={height}>
        {/* Ejes */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#999" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#999" />

        {/* Escala eje Y */}
        {[0.25, 0.5, 0.75, 1].map(p => {
          const y = height - padding - p * (height - padding * 2);
          const value = Math.round(maxValue * p);

          return (
            <g key={p}>
              <line x1={padding - 5} y1={y} x2={padding} y2={y} stroke="#999" />
              <text x={padding - 10} y={y + 4} fontSize="10" textAnchor="end">
                S/ {value}
              </text>
            </g>
          );
        })}

        {/* Línea */}
        <polyline
          fill="none"
          stroke="#4CAF50"
          strokeWidth="3"
          points={points.map(p => `${p.x},${p.y}`).join(" ")}
        />

        {/* Puntos + números */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#4CAF50" />
            <text
              x={p.x}
              y={p.y - 8}
              fontSize="10"
              textAnchor="middle"
              fill="#333"
            >
              S/ {p.value}
            </text>
          </g>
        ))}
      </svg>

      <p><strong>Total vendido:</strong> S/ {data[data.length - 1]}</p>
    </section>
  );
}