import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Heart, 
  Phone, 
  MapPin, 
  Clock, 
  Stethoscope, 
  Shield, 
  Activity,
  ChevronRight,
  Menu,
  X,
  MessageCircle
} from 'lucide-react'
import './App.css'

// Importando logo (adicione o arquivo em /src/assets/logo.png)
import logo from './assets/logo.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'specialties', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const specialties = [
    {
      title: "Artrite Reumatoide",
      description: "Doença inflamatória crônica autoimune que atinge principalmente as articulações, causando dor, inchaço, rigidez e perda de função.",
      symptoms: ["Rigidez matinal > 1h", "Inchaço simétrico", "Fadiga constante"],
      icon: <Activity className="w-6 h-6" />
    },
    {
      title: "Lúpus Eritematoso Sistêmico",
      description: "Doença autoimune sistêmica que pode acometer articulações, pele, rins, pulmões, coração e sistema nervoso.",
      symptoms: ["Dores articulares", "Manchas na pele", "Queda de cabelo"],
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Fibromialgia",
      description: "Caracteriza-se por dor crônica difusa, fadiga e distúrbios do sono.",
      symptoms: ["Dor em todo corpo > 3 meses", "Cansaço excessivo", "Névoa mental"],
      icon: <Heart className="w-6 h-6" />
    },
    {
      title: "Osteoporose",
      description: "Perda de massa óssea que aumenta o risco de fraturas, silenciosa e progressiva.",
      symptoms: ["Histórico familiar", "Menopausa precoce", "Uso de corticoides"],
      icon: <Stethoscope className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full nav-container z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* LOGO no lugar do texto */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="ReumaVida" className="w-14 h-14 rounded-full shadow-lg" />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'specialties', label: 'Especialidades' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link text-foreground hover:text-accent font-medium ${
                    activeSection === item.id ? 'text-accent' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-accent"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Início' },
                { id: 'about', label: 'Sobre' },
                { id: 'specialties', label: 'Especialidades' },
                { id: 'contact', label: 'Contato' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:text-accent font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <Badge className="mb-4 bg-accent text-accent-foreground">
                Reumatologista Especialista
              </Badge>
              <h1 className="hero-title text-4xl md:text-6xl mb-6">
                Reumatologia com empatia, ciência e escuta ativa
              </h1>
              <p className="elegant-text text-xl mb-8">
                Atendimento humanizado e especializado na zona sul de São Paulo
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="whatsapp-button text-lg px-8 py-6"
                  onClick={() => window.open('https://wa.me/5511948818047', '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Marcar consulta via WhatsApp
                </Button>
                <Button 
                  className="elegant-button text-lg px-8 py-6"
                  onClick={() => scrollToSection('about')}
                >
                  Sobre mim
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
<div className="slide-in-right flex justify-center p-6 relative"> 
  
  {/* Card de Perfil Circular com Fundo Bege Suave e Efeito Hover */}
  <div className="
    motion-safe:floating-animation 
    flex flex-col items-center text-center 
    relative z-10 
    p-8 m-4 max-w-sm 
    rounded-full 
    bg-white/70 backdrop-blur-sm 
    shadow-2xl shadow-amber-100/50 
    transition-all duration-100 ease-in-out 
    /* AJUSTES AQUI: Reduzida a opacidade e o movimento */
    hover:shadow-amber-100/70 hover:-translate-y-[2px] hover:scale-[1.01]
  ">
    
    <img 
      src="/renata.png" 
      alt="Foto da Dra. Renata Monteiro" 
      className="
        w-40 h-40 md:w-48 md:h-48 
        mb-4 mx-auto 
        rounded-full object-cover 
        border-8 border-white shadow-lg
      " 
    />
    
    <div className="text-center mt-2">
      <h3 className="
        text-base md:text-lg lg:text-xl 
        font-semibold 
        text-[#8B6E4E] 
        leading-snug break-words max-w-[200px] mx-auto
      ">
        Dra. Renata Monteiro Gabriel
      </h3>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 fade-in">
            <h2 className="section-title text-3xl md:text-4xl mb-4">
              Quem sou eu
            </h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Texto principal */}
            <div className="fade-in">
              <div className="info-card">
                <div className="flex flex-col items-center lg:items-start mb-6">
                
                  <h3 className="section-title text-2xl">Dra. Renata Monteiro</h3>
                </div>
                <div className="space-y-6">
                  <p className="elegant-text leading-relaxed">
                    Sou médica Reumatologista com título de especialista pela 
                    Sociedade Brasileira de Reumatologia. Atuo com dedicação ao 
                    diagnóstico, acompanhamento e tratamento de doenças autoimunes 
                    e musculoesqueléticas, buscando sempre aliar 
                    <span className="accent-text"> ciência, empatia e escuta ativa</span>.
                  </p>
                  <p className="elegant-text leading-relaxed">
                    Natural de Manaus (AM), iniciei minha jornada na Medicina na 
                    Universidade do Estado do Amazonas. Realizei residência em Clínica 
                    Médica pela Secretaria Municipal de Saúde de São Paulo e 
                    especializei-me em Reumatologia no 
                    <span className="accent-text"> Hospital do Servidor Público Estadual de São Paulo (IAMSPE)</span>.
                  </p>
                  <p className="elegant-text leading-relaxed">
                    Moro há 7 anos na zona sul de São Paulo, na região da Avenida Interlagos, 
                    onde também atendo. Sou casada e mãe de gêmeas de 2 anos, que me ensinam 
                    diariamente sobre resiliência, amor e presença — valores que levo também 
                    para a prática médica.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Cards informativos */}
            <div className="fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="section-card p-6 text-center min-h-[150px] hover:shadow-lg hover:-translate-y-1 transition">
                  <CardContent>
                    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-background mb-4">
                      <Stethoscope className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Especialização</h4>
                    <p className="text-sm text-muted-foreground">Reumatologia - IAMSPE</p>
                  </CardContent>
                </Card>
                
                <Card className="section-card p-6 text-center min-h-[150px] hover:shadow-lg hover:-translate-y-1 transition">
                  <CardContent>
                    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-background mb-4">
                      <Shield className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Certificação</h4>
                    <p className="text-sm text-muted-foreground">Sociedade Brasileira de Reumatologia</p>
                  </CardContent>
                </Card>
                
                <Card className="section-card p-6 text-center min-h-[150px] hover:shadow-lg hover:-translate-y-1 transition">
                  <CardContent>
                    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-background mb-4">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Abordagem</h4>
                    <p className="text-sm text-muted-foreground">Empatia e escuta ativa</p>
                  </CardContent>
                </Card>
                
                <Card className="section-card p-6 text-center min-h-[150px] hover:shadow-lg hover:-translate-y-1 transition">
                  <CardContent>
                    <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-background mb-4">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Localização</h4>
                    <p className="text-sm text-muted-foreground">Zona Sul - São Paulo</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="section-title text-3xl md:text-4xl mb-4">
              Áreas de Atuação
            </h2>
            <div className="section-divider"></div>
            <p className="elegant-text text-xl max-w-3xl mx-auto">
              Diagnóstico, acompanhamento e tratamento especializado de doenças autoimunes e musculoesqueléticas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {specialties.map((specialty, index) => (
              <Card key={index} className="section-card p-6 fade-in">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="specialty-icon">
                      {specialty.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {specialty.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4 leading-relaxed">
                    {specialty.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h5 className="font-semibold text-foreground">Sinais de alerta:</h5>
                    <ul className="space-y-1">
                      {specialty.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <ChevronRight className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    className="mt-4 w-full whatsapp-button"
                    onClick={() => window.open('https://wa.me/5511948818047', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Agendar consulta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

{/* Contact Section */}
<section id="contact" className="py-20 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 fade-in">
      <h2 className="section-title text-3xl md:text-4xl mb-4">
        Contato e Localização
      </h2>
      <div className="section-divider"></div>
    </div>
    
    {/* Cards iguais em altura */}
    <div className="grid lg:grid-cols-2 gap-12 items-stretch">
      
      {/* Card: Informações de Contato */}
      <Card className="section-card p-8 h-full">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground mb-6">
            Informações de Contato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Endereço</h4>
              <p className="text-muted-foreground">
                Avenida Adolfo Pinheiro, n°1000<br />
                Conjunto 31 - Santo Amaro<br />
                São Paulo - SP
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">WhatsApp</h4>
              <p className="text-muted-foreground">(11) 94881-8047</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Clock className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground">Atendimento</h4>
              <p className="text-muted-foreground">
                Consultório particular<br />
                Estrutura confortável e acolhedora
              </p>
            </div>
          </div>
          
          <Button 
            className="w-full whatsapp-button text-lg py-6 mt-8"
            onClick={() => window.open('https://wa.me/5511948818047', '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Entrar em contato via WhatsApp
          </Button>
        </CardContent>
      </Card>
      
      {/* Card: Minha Abordagem */}
      <Card className="section-card p-8 h-full">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground mb-6">
            Minha Abordagem
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Acredito que o cuidado em Reumatologia vai além da prescrição: é preciso compreender 
            a história, os sintomas e os impactos de cada doença na vida do paciente.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Meu compromisso é oferecer um atendimento de qualidade, humano e atualizado, 
            sempre aliando ciência, empatia e escuta ativa.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
              <h5 className="font-semibold text-foreground">Empatia</h5>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Stethoscope className="w-8 h-8 text-accent mx-auto mb-2" />
              <h5 className="font-semibold text-foreground">Ciência</h5>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <Activity className="w-8 h-8 text-accent mx-auto mb-2" />
              <h5 className="font-semibold text-foreground">Escuta Ativa</h5>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  {/* Mapa Google */}
  <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-in">
    <h3 className="text-2xl font-bold text-center mb-6">Como chegar</h3>
    <div className="rounded-lg overflow-hidden shadow-lg">
      <iframe
        title="Localização ReumaVida"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.267394283929!2d-46.7173897!3d-23.5660658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5038f5b85a91%3A0x9ec1cf5f66e4d4d6!2sAv.%20Adolfo%20Pinheiro%2C%201000%20-%20Santo%20Amaro%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1695561234567!5m2!1spt-BR!2sbr"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>


     {/* Footer */}
      <footer className="footer-gradient text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <img src={logo} alt="ReumaVida" className="w-16 h-16" />
            </div>
            <p className="text-background/80 mb-4">
              Dra. Renata Monteiro Gabriel - Reumatologista
            </p>
            <p className="text-background/60 text-sm">
              Reumatologia com empatia, ciência e escuta ativa
            </p>
            <div className="mt-8 pt-8 border-t border-background/20">
              <p className="text-background/60 text-sm">
                © {new Date().getFullYear()} ReumaVida. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App