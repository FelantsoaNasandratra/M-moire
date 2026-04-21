const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎪</span>
              <span className="text-lg font-bold">EventPlatform</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 EventPlatform — Projet M2 Informatique
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;