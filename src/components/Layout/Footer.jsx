import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} Bet Acadêmica - Plataforma de Apostas Esportivas para Fins Acadêmicos
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Este é um projeto fictício. Nenhuma aposta real é realizada.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;