import { FaTimes } from "react-icons/fa";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

import me from "../assets/me.jpg";

interface ModalProps {
  isOpen: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 backdrop-blur-md bg-opacity-50 z-30">
      <div className="dark:bg-gray-800 bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 animate-popup relative">
        <button
          className="absolute top-4 right-4 text-gray-400 dark:hover:text-white hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes size="24" />
        </button>
        <div className="text-gray-700 dark:text-white">
          <h2 className="text-2xl font-bold mb-4">How to Play 2048</h2>
          <p className="mb-4">
            <strong>Objective:</strong> Combine tiles to create a tile with the
            number 2048.
          </p>
          <p className="mb-2">
            <strong>Instructions:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Move Tiles:</strong> Use arrow keys or swipe to move
              tiles.
            </li>
            <li>
              <strong>Combine Tiles:</strong> Tiles with the same number merge
              into one with their sum.
            </li>
            <li>
              <strong>New Tiles:</strong> A new tile (2 or 4) appears after each
              move.
            </li>
            <li>
              <strong>Win:</strong> Create a tile with 2048 to win.
            </li>
            <li>
              <strong>Game Over:</strong> No moves left when the grid is full.
            </li>
          </ul>
          <p className="mb-2">
            <strong>Tips:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Plan your moves.</li>
            <li>Keep high-value tiles in a corner.</li>
            <li>Combine strategically.</li>
          </ul>
        </div>

        <div className="mt-8 text-gray-700 dark:text-white">
          <h3 className="text-xl font-bold mb-4">Developed by</h3>
          <div className="flex items-center">
            <img
              src={me}
              alt="Developer Avatar"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h4 className="text-lg font-bold">Feysel Mubarek</h4>
              <p className="text-gray-400 mb-2">
                A passionate developer who loves creating web applications.
              </p>
              <div className="flex space-x-3">
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white hover:text-amber-400 transition-all duration-200"
                >
                  <SiGithub size="20" />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white hover:text-amber-400 transition-all duration-200"
                >
                  <SiLinkedin size="20" />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white hover:text-amber-400 transition-all duration-200"
                >
                  <SiX size="20" />
                </a>
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white hover:text-amber-400 transition-all duration-200"
                >
                  <SiInstagram size="20" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
