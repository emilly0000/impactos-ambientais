"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Download, Factory, Droplets, Trees, Trash2, BatteryCharging } from "lucide-react";
import html2canvas from "html2canvas";

const data = [
  {
    titulo: "Poluição do Ar",
    descricao: "Emissões de gases tóxicos e efeito estufa gerados pela indústria.",
    detalhe:
      "A poluição atmosférica industrial é causada principalmente pela emissão de gases como CO₂, NOx e SO₂. Globalmente, o setor industrial é responsável por aproximadamente 21-30% das emissões totais de gases de efeito estufa.",
    cor: "#EF4444",
    imagem: "/poluicaoAR.png",
    icone: <Factory className="w-8 h-8 text-red-600" />,
  },
  {
    titulo: "Poluição da Água",
    descricao: "Descarte de efluentes industriais em rios e mares.",
    detalhe:
      "Indústrias liberam efluentes químicos e resíduos que comprometem rios, lagos e abastecimento de água. Dados oficiais mostram que menos da metade do esgoto urbano gerado é tratado de forma adequada, agravando os impactos à saúde humana e ao meio ambiente.",
    cor: "#3B82F6",
    imagem: "/poluicaoAgua.png",
    icone: <Droplets className="w-8 h-8 text-blue-600" />,
  },
  {
    titulo: "Desmatamento",
    descricao: "Expansão agroindustrial e exploração madeireira.",
    detalhe: "O desmatamento no Brasil é majoritariamente impulsionado pela agropecuária, que responde por quase 96% da derrubada de vegetação nativa em 2022. A abertura de pastagens, cultivo agrícola, mineração e expansão urbana destroem biomas vitais, ameaçando biodiversidade, solo, clima e comunidades locais. Dados recentes mostram pequenas quedas, mas ainda há urgência em frear essa degradação.",
    cor: "#22C55E",
    imagem: "/desmatamento.png",
    icone: <Trees className="w-8 h-8 text-green-600" />,
  },
  {
    titulo: "Resíduos Sólidos",
    descricao: "Geração de plásticos, metais e lixo industrial.",
    detalhe: "A indústria gera grandes quantidades de resíduos sólidos, muitos não biodegradáveis.",
    cor: "#FACC15",
    grafico: [
      { name: "Plásticos", value: 50 },
      { name: "Metais", value: 25 },
      { name: "Outros", value: 25 },
    ],
    icone: <Trash2 className="w-8 h-8 text-yellow-600" />,
  },
  {
    titulo: "Consumo de Energia",
    descricao: "Uso excessivo de combustíveis fósseis na indústria.",
    detalhe: "Fontes de energia não renováveis ainda dominam o consumo industrial em muitos países.",
    cor: "#EAB308",
    grafico: [
      { name: "Fontes fósseis", value: 80 },
      { name: "Fontes renováveis", value: 20 },
    ],
    icone: <BatteryCharging className="w-8 h-8 text-yellow-700" />,
  },
];

export default function Infograficos() {
  const [open, setOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  const handleDownload = () => {
    const target = document.getElementById("grafico");
    if (target) {
      html2canvas(target).then((canvas) => {
        const link = document.createElement("a");
        link.download = "grafico.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <section id="infograficos" className="bg-[#F4F0E6] py-16 px-4 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-[#0A421C] mb-12 tracking-tight">Impactos Ambientais em Números</h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
        {data.map((item, index) => (
          <Card
            key={index}
            className="w-full sm:w-[320px] md:w-[300px] lg:w-[260px] xl:w-[220px] cursor-pointer hover:shadow-2xl transition-transform hover:-translate-y-2 bg-white/80 border-2 border-[#0A421C]/10"
            onClick={() => {
              setItemSelecionado(item);
              setOpen(true);
            }}
          >
            <CardContent className="flex flex-col items-center text-center p-7">
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mb-4 shadow"
                style={{ backgroundColor: `${item.cor}20` }}
              >
                {item.icone}
              </div>
              <h3 className="font-bold text-lg text-[#0A421C] mb-2">{item.titulo}</h3>
              <p className="text-gray-700 text-sm mb-1">{item.descricao}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{itemSelecionado?.titulo}</DialogTitle>
          </DialogHeader>
          <p className="text-gray-700 mt-2 mb-4 text-base leading-relaxed">{itemSelecionado?.detalhe}</p>
          <div id="grafico" className="mt-4 flex justify-center">
            {itemSelecionado?.grafico ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={itemSelecionado?.grafico}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {itemSelecionado?.grafico?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={itemSelecionado?.cor} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center text-gray-400 italic">Adicione um infográfico aqui</div>
            )}
          </div>
          <Button className="mt-6 flex items-center gap-2" onClick={handleDownload}>
            <Download size={16} /> Baixar Infográfico
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
