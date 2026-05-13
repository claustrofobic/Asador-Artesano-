<?php
namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Plato;

class PedidoController extends Controller
{

public function showPdf($id)
{
    $pedido = Pedido::with(['items.plato', 'usuario'])->findOrFail($id);
    require_once base_path('vendor/setasign/fpdf/fpdf.php');

    // Conversión UTF-8 → ISO-8859-1 para tildes y caracteres especiales
    $enc = fn($s) => iconv('UTF-8', 'ISO-8859-1//TRANSLIT', $s ?? '-');

    $pdf = new \FPDF();
    $pdf->AddPage();
    $pdf->SetMargins(15, 15, 15);

    // ── CABECERA ──────────────────────────────────────────
    $pdf->SetFillColor(101, 67, 33);
    $pdf->Rect(0, 0, 210, 38, 'F');

    $pdf->SetTextColor(245, 235, 215);
    $pdf->SetFont('Times', 'B', 22);
    $pdf->SetY(8);
    $pdf->Cell(0, 10, 'Asador Artesano', 0, 1, 'C');
    $pdf->SetFont('Times', 'I', 10);
    $pdf->Cell(0, 6, $enc('Pedido #' . $pedido->id . '   |   ' . $pedido->created_at->format('d/m/Y H:i')), 0, 1, 'C');
    $pdf->Ln(10);

    $pdf->SetTextColor(60, 40, 20);

    // ── DATOS DEL CLIENTE ─────────────────────────────────
    $nombre = $pedido->usuario->name
        ?? $pedido->usuario->nombre
        ?? $pedido->nombre_guest
        ?? '-';

    $telefono = $pedido->usuario
        ? ($pedido->usuario->telefono ?? '-')
        : ($pedido->telefono_guest ?? '-');

    $pdf->SetFillColor(232, 218, 196);
    $pdf->SetFont('Times', 'B', 12);
    $pdf->Cell(0, 9, $enc('  Datos del cliente'), 0, 1, 'L', true);
    $pdf->Ln(2);

    $pdf->SetFont('Times', 'B', 10);
    $pdf->SetTextColor(101, 67, 33);
    $pdf->Cell(45, 7, 'Nombre:', 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->Cell(0, 7, $enc($nombre), 0, 1);

    $pdf->SetFont('Times', 'B', 10);
    $pdf->SetTextColor(101, 67, 33);
    $pdf->Cell(45, 7, $enc('Teléfono:'), 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->Cell(0, 7, $enc($telefono), 0, 1);

    $pdf->SetFont('Times', 'B', 10);
    $pdf->SetTextColor(101, 67, 33);
    $pdf->Cell(45, 7, 'Hora recogida:', 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->Cell(0, 7, $enc($pedido->hora_recogida ?? '-'), 0, 1);

    $pdf->SetFont('Times', 'B', 10);
    $pdf->SetTextColor(101, 67, 33);
    $pdf->Cell(45, 7, 'Medio de pago:', 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->Cell(0, 7, $enc(ucfirst($pedido->medio_pago)), 0, 1);

    $pdf->SetFont('Times', 'B', 10);
    $pdf->SetTextColor(101, 67, 33);
    $pdf->Cell(45, 7, 'Estado:', 0, 0);
    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->Cell(0, 7, $enc(ucfirst($pedido->estado)), 0, 1);
    $pdf->Ln(5);

    // ── TABLA DE ITEMS ────────────────────────────────────
    $pdf->SetFillColor(232, 218, 196);
    $pdf->SetFont('Times', 'B', 12);
    $pdf->Cell(0, 9, $enc('  Detalle del pedido'), 0, 1, 'L', true);
    $pdf->Ln(2);

    $pdf->SetFillColor(101, 67, 33);
    $pdf->SetTextColor(245, 235, 215);
    $pdf->SetDrawColor(101, 67, 33);
    $pdf->SetFont('Times', 'B', 10);
    $pdf->Cell(90, 8, 'Plato', 1, 0, 'L', true);
    $pdf->Cell(25, 8, 'Cantidad', 1, 0, 'C', true);
    $pdf->Cell(35, 8, 'Precio unit.', 1, 0, 'C', true);
    $pdf->Cell(30, 8, 'Subtotal', 1, 1, 'C', true);

    $pdf->SetFont('Times', '', 10);
    $pdf->SetTextColor(60, 40, 20);
    $pdf->SetDrawColor(180, 150, 110);
    $fill = false;
    foreach ($pedido->items as $item) {
        $subtotal = $item->cantidad * $item->precio_unitario;
        $pdf->SetFillColor($fill ? 245 : 255, $fill ? 235 : 255, $fill ? 215 : 255);
        $pdf->Cell(90, 7, $enc($item->plato->nombre), 1, 0, 'L', true);
        $pdf->Cell(25, 7, $item->cantidad, 1, 0, 'C', true);
        $pdf->Cell(35, 7, number_format($item->precio_unitario, 2) . ' EUR', 1, 0, 'C', true);
        $pdf->Cell(30, 7, number_format($subtotal, 2) . ' EUR', 1, 1, 'C', true);
        $fill = !$fill;
    }

    $pdf->SetFillColor(101, 67, 33);
    $pdf->SetTextColor(245, 235, 215);
    $pdf->SetDrawColor(101, 67, 33);
    $pdf->SetFont('Times', 'B', 10);
    $pdf->Cell(150, 8, 'TOTAL', 1, 0, 'R', true);
    $pdf->Cell(30, 8, number_format($pedido->total, 2) . ' EUR', 1, 1, 'C', true);

    // ── PIE ───────────────────────────────────────────────
    $pdf->Ln(10);
    $pdf->SetTextColor(160, 120, 80);
    $pdf->SetFont('Times', 'I', 9);
    $pdf->Cell(0, 6, $enc('Gracias por su pedido — Asador Artesano'), 0, 1, 'C');

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
