const editor = document.getElementById('code-editor');
const resultIframe = document.getElementById('result-iframe');

// --- 1. Kodni ishga tushirish funksiyasi ---
function runCode() {
    const code = editor.value;
    // Kiritilgan HTML kodni iframe ichida ko'rsatish
    // srcdoc xususiyati iframe ga HTML kodni to'g'ridan-to'g'ri joylash imkonini beradi.
    resultIframe.srcdoc = code;
}

// --- 2. URL manzilidagi kodni o'qish va yuklash funksiyasi ---
function loadCodeFromUrl() {
    // Agar URL manzilida hash fragmenti (#...) bo'lsa
    if (window.location.hash) {
        try {
            // # belgisini olib tashlab, qolgan qismni olish
            const encoded = window.location.hash.substring(1);
            
            // Base64 dan decode (ochish)
            const decodedCode = atob(encoded);

            // Muharrirga yuklash
            editor.value = decodedCode;

            // Koddni darhol ishga tushirish
            runCode();
            
            console.log("Kod URL orqali muvaffaqiyatli yuklandi.");
        } catch (e) {
            console.error("Kodni decode qilishda xatolik yuz berdi:", e);
            alert("Ushbu havola yaroqsiz kodni o'z ichiga olgan.");
        }
    } else {
        // Agar havola bo'sh bo'lsa, muharrirga namuna kodni yuklash
        editor.value = `<h1>Salom, Bu mening HTML Snip Loyiham!</h1>
<p>Natijani ko'rish uchun "Run"ni bosing.</p>
<script>
    console.log("Skript ishlayapti");
    document.body.style.backgroundColor = 'lightblue';
</\script>`;
        runCode(); // Namuna kodni ham ishga tushirish
    }
}

// --- 3. Ulashish uchun havola yaratish funksiyasi ---
function getShareLink() {
    const code = editor.value;
    
    // Base64 yordamida kodlash
    const encoded = btoa(code);

    // Yangi URL manzilini # belgisidan keyin kodlangan ma'lumot bilan yaratish
    // window.location.pathname - /snip/ qismini ushlab qoladi
    const newUrl = `${window.location.origin}${window.location.pathname}#${encoded}`;

    // Brauzer manzil satrini yangilash (sahifani qayta yuklamasdan)
    window.history.pushState(null, '', newUrl);

    // Foydalanuvchiga havolani berish
    alert("Ulashish havolasi yaratildi va manzil satriga o'rnatildi:\n" + newUrl);
}

// Sahifa yuklanganda kodni URL dan avtomatik yuklash
window.onload = loadCodeFromUrl;
