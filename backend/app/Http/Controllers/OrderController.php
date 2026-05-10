<?php
namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Plato;

class OrderController extends Controller
{

    public function showPdf($id)
{
    $pedido = Pedido::with(['items.plato', 'usuario'])->findOrFail($id);
    require_once base_path('vendor/setasign/fpdf/fpdf.php');
    $pdf = new \FPDF();
    $pdf->AddPage();
    $pdf->SetMargins(15, 15, 15);

    // ── CABECERA ──────────────────────────────────────────
    $pdf->SetFont('Arial', 'B', 20);
    $pdf->Cell(0, 10, 'Mi Restaurante', 0, 1, 'C');
    $pdf->SetFont('Arial', '', 10);
    $pdf->Cell(0, 6, 'Pedido #' . $pedido->id, 0, 1, 'C');
    $pdf->Cell(0, 6, 'Fecha: ' . $pedido->created_at->format('d/m/Y H:i'), 0, 1, 'C');
    $pdf->Ln(5);

    // ── DATOS DEL CLIENTE ─────────────────────────────────
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 8, 'Datos del cliente', 0, 1);
    $pdf->SetFont('Arial', '', 10);

    $nombre = $pedido->usuario
        ? $pedido->usuario->name
        : $pedido->nombre_guest;

    $telefono = $pedido->usuario
        ? ($pedido->usuario->telefono ?? '-')
        : $pedido->telefono_guest;

    $pdf->Cell(40, 7, 'Nombre:', 0, 0);
    $pdf->Cell(0, 7, $nombre, 0, 1);
    $pdf->Cell(40, 7, 'Telefono:', 0, 0);
    $pdf->Cell(0, 7, $telefono, 0, 1);
    $pdf->Cell(40, 7, 'Hora recogida:', 0, 0);
    $pdf->Cell(0, 7, $pedido->hora_recogida ?? '-', 0, 1);
    $pdf->Cell(40, 7, 'Medio de pago:', 0, 0);
    $pdf->Cell(0, 7, ucfirst($pedido->medio_pago), 0, 1);
    $pdf->Cell(40, 7, 'Estado:', 0, 0);
    $pdf->Cell(0, 7, ucfirst($pedido->estado), 0, 1);
    $pdf->Ln(5);

    // ── TABLA DE ITEMS ────────────────────────────────────
    $pdf->SetFont('Arial', 'B', 12);
    $pdf->Cell(0, 8, 'Detalle del pedido', 0, 1);

    // Cabecera tabla
    $pdf->SetFillColor(240, 240, 240);
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(90, 8, 'Plato', 1, 0, 'L', true);
    $pdf->Cell(25, 8, 'Cantidad', 1, 0, 'C', true);
    $pdf->Cell(35, 8, 'Precio unit.', 1, 0, 'C', true);
    $pdf->Cell(30, 8, 'Subtotal', 1, 1, 'C', true);

    // Filas
    $pdf->SetFont('Arial', '', 10);
    foreach ($pedido->items as $item) {
        $subtotal = $item->cantidad * $item->precio_unitario;
        $pdf->Cell(90, 7, $item->plato->nombre, 1, 0, 'L');
        $pdf->Cell(25, 7, $item->cantidad, 1, 0, 'C');
        $pdf->Cell(35, 7, number_format($item->precio_unitario, 2) . ' EUR', 1, 0, 'C');
        $pdf->Cell(30, 7, number_format($subtotal, 2) . ' EUR', 1, 1, 'C');
    }

    // Total
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->Cell(150, 8, 'TOTAL', 1, 0, 'R');
    $pdf->Cell(30, 8, number_format($pedido->total, 2) . ' EUR', 1, 1, 'C');

    // ── SALIDA ────────────────────────────────────────────
    $contenido = $pdf->Output('S');

    return response($contenido, 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'attachment; filename="pedido-' . $pedido->id . '.pdf"');
}

    //funcion que muestra los pedidos
    public function index()
{
    $pedidos = auth()->user()
        ->pedidos()
        ->with(['items.plato']) // carga los items y el plato de cada item
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($pedidos);
}

    public function indexAdmin(){
        $pedidos = Pedido::query()
        ->with(['items.plato', 'usuario']) // carga los items, el plato de cada item y el usuario que hizo el pedido
        ->orderBy('created_at', 'desc')
        ->get();
        return response()->json($pedidos);
    }

    public function updateEstado($id, \Illuminate\Http\Request $request)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->estado = $request->estado;
        $pedido->save();

        return response()->json($pedido);
    }
    //funcion q crea un nuevo pedido
    public function store(\Illuminate\Http\Request $request)
{

    $total = 0;
    $items = [];

    // recorre cada plato_id del array
foreach ($request->items as $item) {
        $plato = Plato::findOrFail($item['plato_id']);
        $total += $plato->precio * $item['cantidad'];
    $items[] = [
    'plato_id'        => $plato->id,
    'cantidad'        => $item['cantidad'],
    'precio_unitario' => $plato->precio,
];
    }

    $pedido = Pedido::create([
    'usuario_id'     => auth()->id(),
    'total'          => $total,
    'hora_recogida'  => $request->hora_recogida,
    'estado'         => 'pendiente',
    'medio_pago'     => $request->medio_pago,
]);

    foreach ($items as $item) {
        $pedido->items()->create($item);
    }

    return response()->json($pedido, 201);
}
}
