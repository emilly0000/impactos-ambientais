"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Download, Factory, Droplets, Trees, Trash2, BatteryCharging } from "lucide-react";

const data = [
  {
    titulo: "Poluição do Ar",
    descricao: "Emissões de gases tóxicos e efeito estufa gerados pela indústria.",
    detalhe:
      "A poluição atmosférica industrial é causada principalmente pela emissão de gases como CO₂, NOₓ e SO₂. A nível global, o setor industrial é responsável por aproximadamente 21–30% das emissões totais de gases de efeito estufa, considerando emissões diretas e indiretas.",
    cor: "#EF4444",
    imagem: "/info-Ar.jpeg",
    icone: <Factory className="w-8 h-8 text-red-600" />,
  },
  {
    titulo: "Poluição da Água",
    descricao: "Descarte de efluentes industriais em rios e mares.",
    detalhe:
      "Indústrias liberam efluentes químicos e resíduos que comprometem rios, lagos e abastecimento de água. No Brasil, menos da metade do esgoto urbano gerado é tratado de forma adequada, agravando os impactos à saúde humana e ao meio ambiente.",
    cor: "#3B82F6",
    imagem: "/info-agua.jpeg",
    icone: <Droplets className="w-8 h-8 text-blue-600" />,
  },
  {
    titulo: "Desmatamento",
    descricao: "Expansão agroindustrial e exploração madeireira.",
    detalhe:
      "No Brasil, grande parte do desmatamento é impulsionada pela agropecuária: estudos recentes indicam que cerca de 97% da derrubada de vegetação nativa nos últimos anos se deve à expansão agropecuária (pastagens, cultivo agrícola). Esse desmatamento para abrir pastagens, cultivo agrícola, mineração e expansão urbana destrói biomas vitais, ameaçando biodiversidade, solo, clima e comunidades locais.",
    cor: "#22C55E",
    imagem: "/info-desmatamento.jpg",
    icone: <Trees className="w-8 h-8 text-green-600" />,
  },
  {
    titulo: "Resíduos Sólidos",
    descricao: "Geração de plásticos, metais e lixo industrial.",
    detalhe:
      "A indústria gera grandes quantidades de resíduos sólidos, muitos não biodegradáveis — como plásticos, metais e rejeitos químicos — que causam contaminação do solo e da água em escala global, além de afetar regiões específicas como o Brasil.",
    cor: "#FACC15",
    imagem: "/info-residuos.jpg",
    icone: <Trash2 className="w-8 h-8 text-yellow-600" />,
  },
  {
    titulo: "Consumo de Energia",
    descricao: "Uso excessivo de combustíveis fósseis na indústria.",
    detalhe:
      "Fontes de energia não renováveis ainda dominam o consumo industrial em muitos países, o que aumenta a emissão de gases de efeito estufa e dificulta a transição para uma matriz energética mais limpa.",
    cor: "#EAB308",
    imagem: "/info-energia.jpg",
    icone: <BatteryCharging className="w-8 h-8 text-yellow-700" />,
  },
];

export default function Infograficos() {
  const [open, setOpen] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<any>(null);

  // Função de download corrigida — sem cortes e sem html2canvas
  const handleDownload = async (imgUrl: string, titulo: string) => {
    if (!imgUrl) return;

    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${titulo?.replace(/\s+/g, "-").toLowerCase() || "infografico"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section
  id="infograficos"
  className="bg-[#EAF6EA] py-16 px-6 flex flex-col items-center justify-center min-h-[80vh]"
>
  <h2 className="text-4xl font-bold text-center text-[#0A421C] mb-10 tracking-tight">
    Impactos Ambientais em Números
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 w-full max-w-6xl">

        {data.map((item, index) => (
          <Card
            key={index}
            className="w-full sm:w-[280px] md:w-[300px] lg:w-[260px] xl:w-[220px] cursor-pointer hover:shadow-2xl transition-transform hover:-translate-y-2 bg-white/80 border-2 border-[#0A421C]/10"
            onClick={() => {
              setItemSelecionado(item);
              setOpen(true);
            }}
          >
            <CardContent className="flex flex-col items-center text-center p-5 sm:p-4">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full mb-3 shadow"
                style={{ backgroundColor: `${item.cor}20` }}
              >
                {item.icone}
              </div>
              <h3 className="font-bold text-base sm:text-sm text-[#0A421C] mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-700 text-xs sm:text-[0.8rem] mb-1">
                {item.descricao}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal (dialog) com imagem e botão de download */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{itemSelecionado?.titulo}</DialogTitle>
          </DialogHeader>

          <p className="text-gray-700 mt-2 mb-4 text-base leading-relaxed">
            {itemSelecionado?.detalhe}
          </p>

          {itemSelecionado?.imagem && (
            <div className="mt-4 flex justify-center">
              <Image
                src={itemSelecionado.imagem}
                alt={itemSelecionado.titulo}
                width={500}
                height={400}
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
          )}

          <Button
            className="mt-6 flex items-center gap-2"
            onClick={() =>
              handleDownload(itemSelecionado?.imagem, itemSelecionado?.titulo)
            }
          >
            <Download size={16} /> Baixar Infográfico
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
