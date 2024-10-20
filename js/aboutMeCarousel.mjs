export function initializeImageSlider() {
    const sliderList = document.querySelector('.slider-list');
    if (!sliderList) {
        console.error('Slider list not found!');
        return;
    }

    
    
    const imageFolderPath = 'assets/me/about-me-carousel/'; // Path to the image folder
    
    // Use the updated imageFilenames array going up to 280
    const imageFilenames = [
            '().jpg', '(1).jpg', '(2).jpg', '(3).jpg', '(4).jpg',
            '(6).jpg', '(7).jpg', '(8).jpg', '(9).jpg', '(10).jpg',
            '(11).jpg', '(12).jpg', '(13).jpg', '(14).jpg', '(15).jpg',
            '(16).jpg', '(17).jpg', '(18).jpg', '(19).jpg', '(20).jpg',
            '(21).jpg', '(22).jpg', '(23).jpg', '(24).jpg', '(25).jpg',
             '(27).jpg', '(28).jpg', '(29).jpg', '(30).jpg',
            '(31).jpg', '(32).jpg', '(33).jpg', '(34).jpg', '(35).jpg',
            '(36).jpg', '(37).jpg',  '(39).jpg', '(40).jpg',
            '(41).jpg', '(42).jpg', '(43).jpg', '(44).jpg', '(45).jpg',
            '(46).jpg', '(48).jpg', '(49).jpg', '(50).jpg',
            '(51).jpg', '(52).jpg', '(53).jpg', '(54).jpg', '(55).jpg',
            '(56).jpg', '(57).jpg', '(59).jpg', '(60).jpg',
            '(61).jpg', '(62).jpg', '(63).jpg', '(64).jpg', '(65).jpg',
            '(66).jpg', '(67).jpg', '(69).jpg', '(70).jpg',
             '(72).jpg', '(73).jpg', '(74).jpg', '(75).jpg',
            '(76).jpg', '(78).jpg', '(79).jpg', '(80).jpg',
            '(81).jpg',  '(83).jpg', '(84).jpg', '(85).jpg',
            '(86).jpg', '(87).jpg', '(88).jpg',  '(90).jpg',
            '(91).jpg', '(92).jpg', '(93).jpg', '(94).jpg', '(95).jpg',
            '(96).jpg', '(98).jpg', '(99).jpg', '(100).jpg',
            '(101).jpg', '(102).jpg', '(103).jpg', '(104).jpg', '(105).jpg',
            '(106).jpg', '(107).jpg', '(108).jpg', '(109).jpg', '(110).jpg',
            '(111).jpg', '(112).jpg', '(113).jpg', '(114).jpg', '(115).jpg',
            '(116).jpg', '(117).jpg', '(118).jpg',  '(120).jpg',
            '(121).jpg', '(122).jpg', '(123).jpg', '(124).jpg', '(125).jpg',
            '(126).jpg', '(127).jpg', '(128).jpg',
             '(132).jpg', '(134).jpg', '(135).jpg',
            '(136).jpg', '(137).jpg', '(138).jpg', '(139).jpg', '(140).jpg',
            '(141).jpg', '(142).jpg', '(143).jpg', '(144).jpg',
            '(146).jpg',  '(150).jpg',
            '(151).jpg', '(152).jpg', '(153).jpg', '(154).jpg', '(155).jpg',
            '(156).jpg', '(157).jpg', '(158).jpg', '(159).jpg', '(160).jpg',
            '(161).jpg', '(163).jpg', '(164).jpg', '(165).jpg',
             '(167).jpg', '(168).jpg', '(169).jpg', 
            '(171).jpg', '(172).jpg', '(173).jpg', 
            '(176).jpg', '(177).jpg', '(178).jpg', '(179).jpg', '(180).jpg',
            '(181).jpg', '(183).jpg', '(184).jpg', '(185).jpg',
            '(186).jpg','(188).jpg', '(189).jpg', '(190).jpg',
            '(191).jpg', '(192).jpg', '(193).jpg', '(194).jpg', '(195).jpg',
            '(196).jpg', '(197).jpg', '(198).jpg', '(199).jpg', '(200).jpg',
            '(201).jpg', '(202).jpg', '(203).jpg', '(204).jpg', '(205).jpg',
            '(206).jpg', '(207).jpg', '(208).jpg', '(209).jpg', '(210).jpg',
            '(211).jpg', '(212).jpg', '(213).jpg', '(214).jpg', '(215).jpg',
            '(216).jpg', '(217).jpg', '(218).jpg', '(219).jpg', '(220).jpg',
            '(221).jpg', '(222).jpg', '(223).jpg', '(224).jpg', '(225).jpg',
            '(226).jpg', '(227).jpg', '(228).jpg', '(229).jpg', '(230).jpg',
             '(232).jpg', '(233).jpg', '(235).jpg',
            '(236).jpg', '(237).jpg', '(238).jpg', '(239).jpg', '(240).jpg',
            '(241).jpg', '(242).jpg', '(244).jpg', '(245).jpg',
            '(246).jpg', '(247).jpg', '(248).jpg', '(249).jpg', '(250).jpg',
            '(251).jpg', '(252).jpg', '(253).jpg', '(254).jpg', '(255).jpg',
             '(257).jpg', '(258).jpg', '(259).jpg', '(260).jpg',
            '(261).jpg', '(262).jpg', '(263).jpg', '(264).jpg', '(265).jpg',
            '(266).jpg', '(267).jpg', '(268).jpg', '(269).jpg', '(270).jpg',
            '(271).jpg', '(272).jpg', '(273).jpg',
             '(278).jpg', '(279).jpg', '(280).jpg'
            ];

    // Randomize the image filenames
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(imageFilenames); // Randomize the images

// Create a loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.classList.add('loading-indicator');
loadingIndicator.innerText = 'Cute pictures loading!'; // You can use a spinner or other indicator
sliderList.appendChild(loadingIndicator);

// Add an event listener to hide the loading indicator once all images have loaded
let imagesLoaded = 0;

function createAndAppendImage(filename, index) {
    const sliderItem = document.createElement('div');
    sliderItem.classList.add('slider-list-item');
    sliderItem.setAttribute('style', `--position: ${index + 1}`);

    const img = document.createElement('img');
    img.src = `${imageFolderPath}${filename}`; // Load the image immediately
    img.alt = `Image ${filename}`;

    // Disable right-click for this specific image
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    img.draggable = false;

    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === imageFilenames.length) {
            loadingIndicator.style.display = 'none'; // Hide loading indicator when all images are loaded
        }
    };

    sliderItem.appendChild(img);
    sliderList.appendChild(sliderItem);
}

// Append images dynamically to the slider list
imageFilenames.forEach(createAndAppendImage);

    

    // Append images dynamically to the slider list
    imageFilenames.forEach(createAndAppendImage);

    // Start scrolling logic (no infinite scroll needed with so many images)
    let scrollPosition = 0;
    const scrollSpeed = 0.5;
    let animationId;

    function scrollSlider() {
        scrollPosition -= scrollSpeed;
        sliderList.style.transform = `translateX(${scrollPosition}px)`;

        // Reset scroll position if the end is reached
        if (Math.abs(scrollPosition) >= sliderList.scrollWidth - sliderList.clientWidth) {
            scrollPosition = 0; 
        }

        animationId = requestAnimationFrame(scrollSlider);
    }

    // Start scrolling animation
    function startScroll() {
        if (!animationId) {
            animationId = requestAnimationFrame(scrollSlider);
        }
    }

    // Stop scrolling animation
    function stopScroll() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    startScroll(); // Start the scroll initially

    // Stop scrolling on hover and resume after
    sliderList.addEventListener('mouseenter', stopScroll);
    sliderList.addEventListener('mouseleave', startScroll);

    // Hover effect for grayscale images
    function applyGrayscaleEffect() {
        const items = Array.from(sliderList.children); // Get all items
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                items.forEach(sibling => sibling.classList.add('grayscale'));
                item.classList.remove('grayscale'); // Remove grayscale from hovered item
            });

            item.addEventListener('mouseleave', () => {
                items.forEach(sibling => sibling.classList.remove('grayscale'));
            });
        });
    }

    applyGrayscaleEffect(); // Apply grayscale effect
}
