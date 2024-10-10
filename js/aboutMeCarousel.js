document.addEventListener('DOMContentLoaded', () => {
    // IMAGE SLIDER LOGIC
    const sliderList = document.querySelector('.slider-list');
    const imageFolderPath = 'assets/me/about-me-carousel/'; // Path to the image folder

    const imageFilenames = [
        '(1).jpg', '(2).jpg', '(3).jpg', '(4).jpg', '(5).jpg', 
        '(6).jpg', '(7).jpg', '(8).jpg', '(9).jpg', '(10).jpg',
        '(11).jpg', '(12).jpg', '(13).jpg', '(14).jpg', '(15).jpg',
        '(16).jpg', '(17).jpg', '(18).jpg', '(19).jpg', '(20).jpg',
        '(21).jpg', '(22).jpg', '(23).jpg', '(24).jpg', '(25).jpg',
        '(26).jpg', '(27).jpg', '(28).jpg', '(29).jpg', '(30).jpg',
        '(31).jpg', '(32).jpg', '(33).jpg', '(34).jpg', '(35).jpg',
        '(36).jpg', '(37).jpg', '(38).jpg', '(39).jpg', '(40).jpg',
        '(41).jpg', '(42).jpg', '(43).jpg', '(44).jpg', '(45).jpg',
        '(46).jpg', '(47).jpg', '(48).jpg', '(49).jpg', '(50).jpg',
        '(51).jpg', '(52).jpg', '(53).jpg', '(54).jpg', '(55).jpg',
        '(56).jpg', '(57).jpg', '(58).jpg', '(59).jpg', '(60).jpg',
        '(61).jpg', '(62).jpg', '(63).jpg', '(64).jpg', '(65).jpg',
        '(66).jpg', '(67).jpg', '(68).jpg', '(69).jpg', '(70).jpg',
        '(71).jpg', '(72).jpg', '(73).jpg', '(74).jpg', '(75).jpg',
        '(76).jpg', '(77).jpg', '(78).jpg', '(79).jpg', '(80).jpg',
        '(81).jpg', '(82).jpg', '(83).jpg', '(84).jpg', '(85).jpg',
        '(86).jpg', '(87).jpg', '(88).jpg', '(89).jpg', '(90).jpg',
        '(91).jpg', '(92).jpg', '(93).jpg', '(94).jpg', '(95).jpg',
        '(96).jpg', '(97).jpg', '(98).jpg', '(99).jpg', '(100).jpg',
        '(101).jpg', '(102).jpg', '(103).jpg', '(104).jpg', '(105).jpg',
        '(106).jpg', '(107).jpg', '(108).jpg', '(109).jpg', '(110).jpg',
        '(111).jpg', '(112).jpg', '(113).jpg', '(114).jpg', '(115).jpg',
        '(116).jpg', '(117).jpg', '(118).jpg', '(119).jpg', '(120).jpg',
        '(121).jpg', '(122).jpg', '(123).jpg', '(124).jpg', '(125).jpg'
    ];

    // Randomize the image filenames
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(imageFilenames); // Randomize the images

    // Create and append the images dynamically to the slider list
    imageFilenames.forEach((filename, index) => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('slider-list-item');
        sliderItem.setAttribute('style', `--position: ${index + 1}`);

        const img = document.createElement('img');
        img.src = `${imageFolderPath}${filename}`;
        img.alt = `Image ${filename}`;

        sliderItem.appendChild(img);
        sliderList.appendChild(sliderItem);
    });

    // Duplicate slider items for infinite scrolling effect (images)
    const sliderItems = Array.from(sliderList.children);
    sliderItems.forEach(item => {
        const clone = item.cloneNode(true);
        sliderList.appendChild(clone);
    });

    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    let animationId;

    function scrollSlider() {
        scrollPosition -= scrollSpeed;
        sliderList.style.transform = `translateX(${scrollPosition}px)`;

        if (Math.abs(scrollPosition) >= sliderList.scrollWidth / 2) {
            scrollPosition = 0; // Reset the image scroll position for infinite loop
        }

        animationId = requestAnimationFrame(scrollSlider);
    }

    animationId = requestAnimationFrame(scrollSlider);

    sliderList.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });

    sliderList.addEventListener('mouseleave', () => {
        animationId = requestAnimationFrame(scrollSlider);
    });

    // Hover effect to grayscale other images
    sliderItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            sliderItems.forEach(sibling => sibling.classList.add('grayscale'));
            item.classList.remove('grayscale'); // Remove grayscale from hovered item
        });

        item.addEventListener('mouseleave', () => {
            sliderItems.forEach(sibling => sibling.classList.remove('grayscale'));
        });
    });
});