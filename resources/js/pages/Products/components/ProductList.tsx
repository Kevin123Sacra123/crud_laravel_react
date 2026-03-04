import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function ProductList({ items}){
    return (
      <div>
        <Table>
          <TableCaption>Lista de Productos</TableCaption>
          <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
          </TableRow>
          </TableHeader>
        <TableBody>
            {items.map(product =>(
            <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell> {product.nombre}</TableCell>
                <TableCell>S/  {product.precio}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
      
    );
}