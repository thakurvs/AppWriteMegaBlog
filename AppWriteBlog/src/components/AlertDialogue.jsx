import React from 'react'

function AlertDialogue() {
  return (
    <>
        {/* Fade-out background overlay */}
        <div className="overlay"></div>
            {/* Alert Dialog Box */}
            <div className="alert-dialog">
            <div className="alert-content">
                <h3>Login Successfully</h3>
                <button className="alert-btn" onClick={() => {
                    setShowAlert(false);  // Hide the alert
                    navigate("/");        // Navigate to the desired route
                    }}
                >
                Close
                </button>
            </div>
            </div>

            {/* Styles */}
            <style>{`
            /* Overlay to fade out the rest of the content */
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 255); /* Semi-transparent black */
                z-index: 99; /* Put it behind the alert */
            }

            /* Alert Dialog */
            .alert-dialog {
                width: 30vw;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 100; /* On top of everything */
            }

            .alert-content h3 {
                font-size: 20px;
                margin-bottom: 8px;
            }

            .alert-btn {
                background-color: #3498db;
                color: white;
                padding: 8px 16px;
                border-radius: 5px;
                border: none;
                cursor: pointer;
            }
        `}</style>
    </>
  )
}

export default AlertDialogue
