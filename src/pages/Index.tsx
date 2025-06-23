import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Lightbulb, Sparkles, Copy, CheckCircle, AlertTriangle, ChevronDown, Image } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [briefing, setBriefing] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);

  const MIN_BRIEFING_LENGTH = 80;

  const exampleBriefing = "Um tênis esportivo voltado para jovens urbanos entre 18 e 25 anos. O anúncio deve transmitir energia e movimento. Deve ter um cenário noturno urbano com iluminação de neon. Estilo visual cyberpunk, com foco nos pés do modelo correndo pela cidade.";
  
  const examplePrompt = "A pair of futuristic, neon-lit running shoes worn by a young urban runner sprinting through a cyberpunk city at night. The scene is illuminated by glowing neon signs, wet asphalt reflecting vibrant lights, and dynamic motion blur emphasizing speed. Focus on the shoes, with detailed textures, sleek design, and a background filled with towering buildings and electric colors.";

  const additionalExamples = [
    {
      briefing: "Uma campanha para um smartphone premium direcionada a profissionais criativos entre 25 e 40 anos. O foco deve ser na qualidade da câmera e na elegância do design. Ambiente minimalista e sofisticado, com iluminação suave e tons neutros.",
      prompt: "A sleek, premium smartphone held by elegant hands in a minimalist studio setting. Soft, professional lighting highlights the device's metallic finish and camera lens. Clean white background with subtle shadows, emphasizing sophistication and creative potential through refined composition."
    },
    {
      briefing: "Campanha para um carro elétrico familiar, público-alvo famílias modernas de classe média. Deve transmitir sustentabilidade, segurança e praticidade. Cenário natural com família feliz, paisagem verde ao fundo.",
      prompt: "A modern electric family car parked in a lush green landscape with a happy family of four nearby. Clean energy concept with solar panels visible in the background, bright natural lighting, eco-friendly atmosphere, emphasis on sustainability and family values."
    }
  ];

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop", alt: "AI Generated Advertisement" },
    { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop", alt: "Creative Campaign Visual" },
    { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop", alt: "Tech Product Shot" },
    { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop", alt: "Modern Design Concept" },
    { src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop", alt: "Professional Advertisement" }
  ];

  const generatePrompt = async () => {
    if (!briefing.trim()) {
      toast.error("Por favor, descreva seu briefing criativo");
      return;
    }

    // Verificar se o briefing é muito curto
    if (briefing.trim().length < MIN_BRIEFING_LENGTH) {
      setShowWarningDialog(true);
      return;
    }

    performGeneration();
  };

  const performGeneration = async () => {
    setIsLoading(true);
    setShowWarningDialog(false);
    
    // Simulando chamada da API - aqui você integraria com a OpenAI API
    setTimeout(() => {
      const mockPrompt = `A professional advertising photo featuring ${briefing.toLowerCase().includes('tênis') ? 'athletic footwear' : 'a product'} designed for modern consumers. The image should capture dynamic energy with cinematic lighting, vibrant colors, and a contemporary urban setting. Professional photography style with sharp focus on the main product, atmospheric background, and compelling visual narrative that connects with the target audience.`;
      
      setGeneratedPrompt(mockPrompt);
      setIsLoading(false);
      toast.success("Prompt gerado com sucesso!");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast.success("Prompt copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditBriefing = () => {
    setShowWarningDialog(false);
    // O foco permanece no textarea para edição
  };

  const handleGenerateAnyway = () => {
    performGeneration();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prompt Generator
            </h1>
          </div>
        </div>

        {/* Tips Card */}
        <Card className="mb-8 border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              IMPORTANTE
            </CardTitle>
          </CardHeader>
          <CardContent className="text-red-700 space-y-4">
            <p>
              Seja criativo e forneça informações relevantes como público-alvo, tom desejado, elementos visuais esperados, etc.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Dicas:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Especifique o tipo de produto</li>
                <li>Mencione o público-alvo</li>
                <li>Dê sugestões de ambiente ou emoção</li>
                <li>Seja claro sobre o estilo visual desejado</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* AI Generated Images Gallery */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Image className="h-5 w-5" />
              Exemplos de Imagens Geradas por IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Carousel className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="border-0 shadow-md">
                        <CardContent className="p-0">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        {/* Instruction Message */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
            Descreva como você imagina o seu anúncio e nós te ajudamos na comunicação com a IA!
          </p>
        </div>

        {/* Example Section */}
        <Card className="mb-8 bg-gray-50/50 border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-800 font-bold">Exemplo de Uso</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    Mais exemplos
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-white border shadow-lg">
                  {additionalExamples.map((example, index) => (
                    <DropdownMenuItem key={index} className="p-4 flex-col items-start space-y-2">
                      <div className="w-full">
                        <Badge variant="secondary" className="mb-2 text-gray-600 italic">
                          Briefing {index + 2}:
                        </Badge>
                        <p className="text-xs text-gray-600 italic mb-2">
                          {example.briefing}
                        </p>
                        <Badge variant="default" className="mb-1 font-bold">
                          Prompt gerado:
                        </Badge>
                        <p className="text-xs text-gray-800 font-medium">
                          {example.prompt}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2 text-gray-600 italic">Briefing de Exemplo:</Badge>
              <p className="text-sm text-gray-600 italic bg-white p-3 rounded border">
                {exampleBriefing}
              </p>
            </div>
            
            <div>
              <Badge variant="default" className="mb-2 font-bold text-white-800">Exemplo de prompt gerado:</Badge>
              <p className="text-sm text-gray-800 bg-white p-3 rounded border font-medium">
                {examplePrompt}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-gray-800">Como você imagina o seu anúncio?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={briefing}
              onChange={(e) => setBriefing(e.target.value)}
              placeholder="Descreva aqui seu briefing criativo..."
              className="min-h-32 resize-none border-2 focus:border-purple-400 transition-colors"
            />
            
            <Button
              onClick={generatePrompt}
              disabled={isLoading || !briefing.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando Prompt...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Gerar Prompt Visual
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Prompt Output */}
        {generatedPrompt && (
          <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center justify-between">
                Prompt Gerado:
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <p className="text-gray-800 leading-relaxed font-medium">
                  {generatedPrompt}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Warning Dialog */}
        <Dialog open={showWarningDialog} onOpenChange={setShowWarningDialog}>
          <DialogContent className="bg-yellow-50 border-yellow-200">
            <DialogHeader>
              <DialogTitle className="text-yellow-800 flex items-center gap-2 text-xl font-bold">
                <AlertTriangle className="h-6 w-6" />
                ATENÇÃO
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-yellow-700">
                Seu briefing está muito curto e pode não conter informações suficientes para gerar um bom prompt. 
                Considere revisar e consultar a seção de dicas para mais ideias.
              </p>
            </div>
            <DialogFooter className="flex gap-2 sm:gap-2">
              <Button
                onClick={handleEditBriefing}
                variant="outline"
                className="border-yellow-300 text-yellow-800 hover:bg-yellow-100"
              >
                Editar briefing
              </Button>
              <Button
                onClick={handleGenerateAnyway}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Gerar mesmo assim
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
};

export default Index;
