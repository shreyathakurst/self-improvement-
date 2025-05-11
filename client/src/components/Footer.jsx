const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Self Improvement App</h3>
              <p className="text-gray-400">Track your personal growth journey</p>
            </div>
            <div className="text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Self Improvement App</p>
              <p className="text-gray-400">All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  