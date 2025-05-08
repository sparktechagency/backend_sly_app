import { NextFunction, Request, Response } from 'express';
import status from 'http-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const htmlResponse = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page Not Found</title>
      <style>
          body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f9;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              color: #333;
              overflow: hidden;
              animation: fadeInBackground 2s ease-in-out;
          }

          @keyframes fadeInBackground {
              0% {
                  background-color: #f4f4f9;
                  opacity: 0;
              }
              100% {
                  background-color: #f4f4f9;
                  opacity: 1;
              }
          }

          .container {
              text-align: center;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              padding: 40px;
              width: 80%;
              max-width: 600px;
              transform: translateY(-30px);
              animation: slideUp 0.8s ease-out forwards;
          }

          @keyframes slideUp {
              0% {
                  transform: translateY(-30px);
                  opacity: 0;
              }
              100% {
                  transform: translateY(0);
                  opacity: 1;
              }
          }

          h1 {
              font-size: 100px;
              margin-bottom: 20px;
              color: #ff6347;
              animation: bounce 1s ease-in-out infinite;
          }

          @keyframes bounce {
              0%, 100% {
                  transform: translateY(0);
              }
              50% {
                  transform: translateY(-20px);
              }
          }

          p {
              font-size: 18px;
              margin-bottom: 30px;
              color: #666;
              animation: fadeInText 2s ease-in-out;
          }

          @keyframes fadeInText {
              0% {
                  opacity: 0;
              }
              100% {
                  opacity: 1;
              }
          }

          .button {
              display: inline-block;
              padding: 15px 30px;
              background-color: #ff6347;
              color: white;
              font-size: 18px;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s, transform 0.2s;
              animation: pulse 2s infinite;
          }

          @keyframes pulse {
              0% {
                  transform: scale(1);
              }
              50% {
                  transform: scale(1.1);
              }
              100% {
                  transform: scale(1);
              }
          }

          .button:hover {
              background-color: #ff4500;
              transform: scale(1.1);
          }

          .image {
              margin-top: 20px;
              max-width: 100%;
              border-radius: 10px;
              opacity: 0;
              animation: fadeInImage 2s ease-in-out forwards;
          }

          @keyframes fadeInImage {
              0% {
                  opacity: 0;
                  transform: translateY(30px);
              }
              100% {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>404</h1>
          <p>Oops! The page you're looking for does not exist.</p>
          <a href="/" class="button">Go Back Home</a>
        
      </div>
  </body>
  </html>
`;

  // Set content type to HTML and return the HTML response
  res
    .status(status.NOT_FOUND)
    .set('Content-Type', 'text/html')
    .send(htmlResponse);
};

export default notFound;
