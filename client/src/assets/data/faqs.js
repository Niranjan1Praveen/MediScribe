export const faqs = [
  {
    question: "What is the purpose of this platform?",
    answer:
      "This platform helps users understand how adversarial attacks affect AI image classifiers. It allows you to visualize how small, often invisible changes to images can trick powerful AI models into making incorrect predictions.",
  },
  {
    question: "Who can use this platform?",
    answer:
      "The platform is ideal for students, researchers, educators, and AI developers who want to explore, demonstrate, or study the vulnerabilities of deep learning models to adversarial attacks.",
  },
  {
    question: "What are adversarial attacks?",
    answer:
      "Adversarial attacks are slight, calculated modifications to input data (like images) that cause AI models to make incorrect predictions. These changes are often imperceptible to the human eye but can completely fool the model.",
  },
  {
    question: "What features does the dashboard offer?",
    answer:
      "Users can upload images, select pre-trained models, apply different attack techniques (like FGSM or PGD), and see how predictions change. The platform also provides confidence scores, perturbation heatmaps, and comparison visualizations.",
  },
  {
    question: "What models and datasets are supported?",
    answer:
      "Common pre-trained models such as ResNet, VGG, and MobileNet are supported, along with datasets like CIFAR-10 and MNIST. More models and datasets will be added in future updates.",
  },
  {
    question: "Can I customize attack parameters?",
    answer:
      "Yes, users can adjust attack-specific parameters like epsilon (perturbation magnitude) to see how sensitivity affects prediction accuracy and robustness.",
  },
];
