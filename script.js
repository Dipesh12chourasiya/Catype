document.addEventListener("DOMContentLoaded", () => {
  //Select the elements
  const textToTypeElement = document.getElementById("text-to-type");
  const typingInputElement = document.getElementById("typing-input");
  const speedElement = document.getElementById("speed");
  const accuracyElement = document.getElementById("accuracy");

  //Text to display
  const sampleTexts = [
    "World, when we enter into it, seems all new and exciting. But as we grow more and more and reach our final phase of living, all we realize is that life is all about nothingness and will end someday.",
    "When you fall in love, you love with all that you’ve got. You must learn to bear anger, hatred, keep your ego and attitude aside and handle things with care, calmness and love.",
    "Life is a happening puzzle in our early days, but as we grow more and more old, we start to realise the meaning of life and the pattern with which it goes on. It actually is nothing but creation, followed by preservation and then destruction.",
    "Humans are nothing but divided amongst the two sides of a coin. They would wanna fight for peace, but by physical war, and only that victory would bring them the final peace",
    "1 one 2 two 3 three 4 four 5 five 6 six 7 seven 8 eight 9 nine 10 ten.",
    `A person is powerful not when his roots and foundations are strong, but his way of carrying out things is commendable and gets him success from it.`,
    `When you sign up for any sort of teamwork, the other person becomes your partner, and you are supposed to stand by each other’s side no matter what.`,
    `Love is an essential element, but not everyone gets it. It’s okay not to have love, but to survive in this world, you need to make yourself capable and achieve success. That’s where you actually stand.`,
    `It may be hard right now… But you must silence those thoughts! Stop counting only those things that you have lost! What is gone, is gone!`,
    `Loneliness” is no longer part of my vocabulary. – Brook`,
    `If you lose credibility by just admitting fault, then you didn’t have any in the first place. – Fujitora`,
    `If I die here, then I’m a man that could only make it this far.`,
    `Yeah, I got voices in my head again, tread carefully And I don't medicate, it helps me temporarily I got problems, I got issues, yeah, apparently Trauma that I'm burying, I think I need some therapy I battle depression, I'm back with a message I'm asking the question that if you hate me, why you actin' obsessive? I'm past the point of no return, fuck bein' passive aggressive I'll brandish a weapon, teach all you motherfuckers a lesson`,
    `Years ago, when I was younger I kinda liked a girl I knew She was mine and we were sweethearts That was then, but then it's true I'm in love with a fairytale Even though it hurts Cause I don't care if I lose my mind I'm already cursed.`,
    `The fear is what keeps you alive Break the fucking chains, take back your life The fear is what keeps you insane Break the fucking chains, take away the pain, yeah`,
    `I want you to know that I m never leaving 'Cause I'm Mrs. Snow. 'Til death we'll be freezing Yeah, you are my home, my home for all seasons So, come on, let's go`
  ];
  console.log(sampleTexts.length)
  //initial values
  let currentIndex = 0;
  let startTime = new Date();
  let errors = 0;

  //Function to initialize or restart the game
  function initializeGame() {
    const text = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    textToTypeElement.textContent = text;
    typingInputElement.value = "";
    currentIndex = 0;
    startTime = new Date();
    errors = 0;
    //update fn
    updateFeedback();
  }
  //Function to update the speed and the accuracy feedback
  function updateFeedback() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 60000;
    if (elapsedTime <= 0) {
      speedElement.textContent = 0;
    } else {
      const wordsTyped = typingInputElement.value.trim().split(/\s+/).length;
      const speed = Math.round(wordsTyped / elapsedTime);
      speedElement.textContent = speed;
    }
    //cal accurracy
    const accuracy =
      currentIndex > 0
        ? Math.round(((currentIndex - errors) / currentIndex) * 100)
        : 100;
    accuracyElement.textContent = accuracy;
  }

  //Function to check typed character
  function checkCharacter(inputChar, targetChar) {
    if (inputChar !== targetChar) {
      errors++;
      //play error sound
      new Audio("/error.mp3").play();
      return false;
    } else {
      return true;
    }
  }
  //Function to display messages to the user
  function displayMessage(message) {
    const messageArea = document.getElementById("message-area");
    messageArea.textContent = message;
    const hurray = document.getElementById("hurrya-img");
    hurray.innerHTML = `
    <img style="margin-bottom: 30px; width: 100px;" src="hurray.gif" alt="congo">
    `
    //clear the msg after 3s
    setTimeout(() => {
      messageArea.textContent = "";
      hurray.innerHTML = ``;
    }, 3000);
  }
  //Event listener for typing input
  typingInputElement.addEventListener("input", (e) => {
    const typedText = typingInputElement.value;
    const targetText = textToTypeElement.textContent;
    if (currentIndex < targetText.length) {
      const isCorrect = checkCharacter(
        typedText[currentIndex],
        targetText[currentIndex]
      );

      textToTypeElement.innerHTML =
        targetText.substring(0, currentIndex) +
        `<span class='${isCorrect ? "correct" : "incorrect"}'>${
          targetText[currentIndex]
        }</span>` +
        targetText.substring(currentIndex + 1);
      currentIndex++;
      if (currentIndex === targetText.length) {
        displayMessage("Text completed starting a new one.");
        initializeGame();
      }
    }
    //update the feedback
    updateFeedback();
  });
  //Start the game
  initializeGame();
});
