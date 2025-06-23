
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Sparkles, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [briefing, setBriefing] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const exampleBriefing = "Um tênis esportivo voltado para jovens urbanos entre 18 e 25 anos. O anúncio deve transmitir energia e movimento. Deve ter um cenário noturno urbano com iluminação de neon. Estilo visual cyberpunk, com foco nos pés do modelo correndo pela cidade.";
  
  const examplePrompt = "A pair of futuristic, neon-lit running shoes worn by a young urban runner sprinting through a cyberpunk city at night. The scene is illuminated by glowing neon signs, wet asphalt reflecting vibrant lights, and dynamic motion blur emphasizing speed. Focus on the shoes, with detailed textures, sleek design, and a background filled with towering buildings and electric colors.";

  const generatePrompt = async () => {
    if (!briefing.trim()) {
      toast.error("Por favor, descreva seu briefing criativo");
      return;
    }

    setIsLoading(true);
    
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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descreva como você imagina o seu anúncio e nós te ajudamos na comunicação com a IA.
          </p>
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

        {/* Example Section */}
        <Card className="mb-8 bg-gray-50/50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800">Exemplo de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Badge variant="secondary" className="mb-2">Briefing de Exemplo:</Badge>
              <p className="text-sm text-gray-600 italic bg-white p-3 rounded border">
                {exampleBriefing}
              </p>
            </div>
            
            <div>
              <Badge variant="default" className="mb-2">Prompt Gerado:</Badge>
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

      </div>
    </div>
  );
};

export default Index;
