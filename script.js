let current = 0;
let timer;
let timeLeft = 30;

const rewards = ["Bã mía 🪵", "1 bịch khô gà 🍗", "2 bịch khô gà 🍗", "5 bịch khô gà 🍗", "10 bịch khô gà 🍗", "50 bịch khô gà 🍗", "100 bịch khô gà 👑"];
const questions = [
    { q: "Tân Tổng thống Ukraine Volodymyr Zelensky làm nghề gì trước khi nhậm chức?", answers: ["Võ sĩ quyền anh", "Diễn viên hài", "Bác sĩ phẫu thuật", "Nhà chính trị"], correct: 1 },
    { q: "Trong một cuộc đua chạy bộ, nếu bạn vượt qua người đang đứng ở vị trí thứ hai, thì bạn đang đứng ở vị trí thứ mấy?", answers: ["Thứ 1", "Thứ 2", "Giữ nguyên", "Về đích luôn"], correct: 1 },
    { q: "Tháng nào sau đây có 28 ngày", answers: ["Tháng 3", "Tháng 2", "Tháng 10", "Tất cả các đáp án trên"], correct: 3 },
    { q: "Bố của Mixi có 5 người con có tên lần lượt là:Phara Tày, Thanh Độ,Nhật Minh,Vũ.Hỏi người con thứ 5 tên gì ?", answers: ["Mixi", "Phara Tày", "Thanh Độ", "Nhật Minh"], correct: 0 },
    { q: "Cái gì luôn luôn đến nhưng không bao giờ đến nơi?", answers: ["Ngày mai", "Tương lai", "Cơn mưa đầu mùa", "Chuyến tàu cuối cùng"], correct: 0 },
    { q: "Tượng đài Chiến thắng Điện Biên Phủ được dựng trên ngọn đồi nào? ", answers: ["A1", "D1", "C1", "E1"], correct: 1 },
    { q: "Thủ đô nào ở châu Âu nằm trên 96 hòn đảo, được nối với nhau bằng những chiếc cầu?", answers: ["London", "Amxtecdam", "Bern", "Stockhom"], correct: 3 }
];

function showStory() {
    // Phát nhạc nền ở màn hình cốt truyện
    const sndStart = document.getElementById("sndStart");
    sndStart.play().catch(e => console.log("Âm thanh đang đợi tương tác..."));
    
    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("storyScreen").classList.remove("hidden");
    
    const storyText = `Mixi: "Alo Vũ à? Vũ đấy à?"\n\nVũ: "Dạ không anh ơi, anh nhầm số rồi"\n\nMixi: "Thôi Vũ ơi, không phải chối! Cái giọng này anh lạ gì nữa, em có tắt máy thì anh cũng tìm ra thôi. Mà Vũ này, em có tin là hôm nay anh gọi để giới thiệu cho em một cái sản phẩm mà nhóm anh vừa mới làm xong không?"\n\nVũ: "Thôi anh ơi... Em đang đau đầu mấy cái văn bản giải trình với 'check var' lắm rồi, anh lại định giới thiệu drama gì nữa đây?"\n\nMixi: "Drama cái gì tầm này! Nhóm anh vừa code xong một con game, mà nói thật là lấy cảm hứng từ chính mấy pha 'quay xe' thần thánh của em đấy. Anh em tôi thức đêm thức hôm để biến mống drama của em thành logic lập trình luôn, uy tín chưa?"\n\nVũ: "Thế trong game có bắt em phải giải trình nhiều không anh? Em sợ nhất khoản đấy..."\n\nMixi: "Yên tâm! Trong này anh cho em tính năng tự động soạn sớ luôn, thích 'ảo ma' bao nhiêu cũng có. Nhưng quan trọng là code của nhóm anh nó mượt, nó không có lỗi 'phông bạt' như kịch bản của em đâu. Anh nói ít hiểu nhiều, em vào 'thẩm' thử xem trình code của anh em tôi có gắt bằng cái lùm xùm vừa rồi không nhé. Vào việc đi Vũ!"`;

    let i = 0;
    const container = document.getElementById("storyText");
    function typing() {
        if (i < storyText.length) {
            container.innerHTML += storyText.charAt(i) === "\n" ? "<br>" : storyText.charAt(i);
            i++;
            setTimeout(typing, 20);
        } else {
            document.getElementById("skipBtn").classList.remove("hidden");
        }
    }
    typing();
}

function startGame() {
    // DỪNG NHẠC NỀN KHI BẮT ĐẦU VÀO TRẬN
    const sndStart = document.getElementById("sndStart");
    sndStart.pause();
    sndStart.currentTime = 0;

    document.getElementById("storyScreen").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    loadQuestion();
    loadLadder();
    updateLadder();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("sndWrong").play();
            alert("HẾT GIỜ! Bạn đã bị 'Check Var' và bay màu!");
            location.reload();
        }
    }, 1000);
}

function loadQuestion() {
    timeLeft = Math.max(10, 30 - (current * 3)); // Thời gian giảm dần mỗi câu
    document.getElementById("timeLeft").innerText = timeLeft;
    startTimer();

    const qData = questions[current];
    document.getElementById("question").innerText = qData.q;
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById("a" + i);
        btn.innerText = String.fromCharCode(65 + i) + ": " + qData.answers[i];
        btn.className = "diamond-shape"; 
        btn.style.display = "inline-block";
        btn.disabled = false;
    }
}

function selectAnswer(index) {
    clearInterval(timer); // Dừng giờ khi đã chọn
    const qData = questions[current];
    const btns = document.querySelectorAll(".answers button");
    
    btns.forEach(b => b.disabled = true);
    btns[index].classList.add("selected");

    setTimeout(() => {
        if (index === qData.correct) {
            // RANDOM SOUND CORRECT (1-3)
            const rand = Math.floor(Math.random() * 3) + 1;
            document.getElementById(`sndCorrect${rand}`).play();
            
            btns[index].classList.add("correct");

            // ĐỢI 6 GIÂY MỚI CHUYỂN CÂU HỎI THEO YÊU CẦU
            setTimeout(() => {
                current++;
                if (current >= questions.length) {
                    document.getElementById("sndEnd").play();
                    alert("CHÚC MỪNG! BẠN ĐÃ VƯỢT QUA 'CHECK VAR' VÀ NHẬN 100 BỊCH KHÔ GÀ!");
                    location.reload();
                } else {
                    loadQuestion();
                    updateLadder();
                }
            }, 6000); // 6 giây

        } else {
            document.getElementById("sndWrong").play();
            btns[index].classList.add("wrong");
            document.getElementById("a" + qData.correct).classList.add("correct");
            setTimeout(() => {
                alert("Giải trình thất bại! Về ăn bã mía đi Vũ ơi!");
                location.reload();
            }, 2500);
        }
    }, 1200);
}

function loadLadder() {
    const list = document.getElementById("ladderList");
    list.innerHTML = "";
    [...rewards].reverse().forEach(r => {
        const li = document.createElement("li");
        li.innerText = r;
        list.appendChild(li);
    });
}

function updateLadder() {
    const items = document.querySelectorAll(".ladder li");
    items.forEach(i => i.classList.remove("active"));
    const activeIndex = items.length - 1 - current;
    if(items[activeIndex]) items[activeIndex].classList.add("active");
}

function fiftyFifty() {
    let correct = questions[current].correct;
    let removed = 0;
    for(let i=0; i<4; i++) {
        if(i !== correct && removed < 2) {
            document.getElementById("a"+i).style.display = "none";
            removed++;
        }
    }
}
function callExpert() { alert("Mixi: 'Nó lại là hợp lý luôn, chọn " + String.fromCharCode(65 + questions[current].correct) + " đi em!'"); }
function callFriend() { alert("Vũ: 'Em đang check var, nhưng chắc đáp án là " + String.fromCharCode(65 + questions[current].correct) + " đấy'"); }