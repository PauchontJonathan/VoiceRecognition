const app  = {

  currentRecordingValue: '',
  isRecording: false,
  isRecordingFeedBack: '',

  init: () => {

    const verifySupport = 'speechSynthesis' in window;

    voiceContainer = document.querySelector('.box');
    recordElement = document.querySelector('.voiceContainer-record');
    outputElement = document.querySelector('.voiceContainer-output');

    if (verifySupport) {
      recordElement.addEventListener('click', app.launchRecognition);
    }
  },

  launchRecognition: () => {
    if (app.isRecording) return ;
    const recognition = new webkitSpeechRecognition() ||new SpeechRecognition() ;

    recognition.start();

    app.startRecognition(recognition);

    app.resultRecognition(recognition);

  },

  startRecognition: (recognition) => {
  recognition.onstart = () => {
    app.isRecording = true;

    const recordingDiv = document.createElement("div");
    recordingDiv.classList.add('box-recording');
    voiceContainer.appendChild(recordingDiv);

    app.isRecordingFeedBack = 'Message audio en enregistrement';
  };
  },

  resultRecognition: (recognition) => {
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      app.currentRecordingValue = transcript;
      app.isRecording = false;
      app.updateDisplay();
    };
  },

  updateDisplay: () => {
    if (!app.isRecording) {
      recordingDiv = document.querySelector('.box-recording');
      recordingDiv.remove();
      outputElement.textContent = `"${app.currentRecordingValue}"`;
    }
  },

};

document.addEventListener('DOMContentLoaded', app.init);
