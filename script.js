

async function chooseSurah() {
    const sesponse = await fetch("http://api.alquran.cloud/v1/surah");
    const data = await sesponse.json();
    //console.log(data.data);
    for (i = 0; i < data.data.length; i++) {

        var su = '<button class="btn btn-primary" style="margin : 13px;" onclick="Surah1(' + i + ')">';
        su += '<div >' + data.data[i].name + ' </div>';
        su += '<div >' + data.data[i].englishName + '</div>';
        su += '<div >(' + data.data[i].number + ')</div>';
        su += "</button>";

        $("#surahTable").append(su)
    }
for (;;){}
}
chooseSurah()
async function getText() {

    const response = await fetch("http://api.alquran.cloud/v1/surah")
    const data = await response.json()

    x = data.data.length;

    // console.log(x)
    var su = '<select class="form-select" size="5" aria-label="size 3 select example" onchange="Surah1(this.value)">';
    su += '<option> إختر السورة</option>';
    for (i = 0; i < data.data.length; i++) {
        su += '<option value="' + (i + 1) + '">' + data.data[i].name + '</option>';
    }
    su += '</select>';
    $("#selector").append(su);

    console.log()

}
//getText();



async function Surah1(surahNumber) {

    const response = await fetch("http://api.alquran.cloud/v1/surah/" + surahNumber)
    const data = await response.json()
    $("#verses").empty();
    //console.log(data.data.ayahs)
    var ayahsLength = data.data.ayahs.length;
    var st=''; 
    for (i = 0; i < ayahsLength; i++) {

        st += '<div class="ayahBox1"><h1>';
        st += data.data.ayahs[i].text + '(' + (i + 1) + ')';
        st += '</h1>  <audio id="audio'+i+'" class="audio hidden" controls="" name="media" style="margin-top: 13px;"></audio> </div>';
    }
    $("#verses").append(st);
    setTimeout(async () => {
        for (i = 0; i < ayahsLength; i++) {
            const sesponse1 = await fetch("http://api.alquran.cloud/v1/ayah/" + surahNumber + ":" + (i+1));//Audio
            const data1 = await sesponse1.json();
            var ayahNumber = data1.data.number
            srcAudio = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/" + ayahNumber + ".mp3";
            $('#audio'+i).append('<source src="'+srcAudio+'" type="audio/mpeg"></source>');
        }
    }, 10);

  //  getAudio(surahNumber,ayahsLength)
}


function showAudio()
{
     $('.audio').toggleClass('hidden');
//    if(document.querySelector(".audio").classList.contains('hidden')){
//        document.querySelector(".audio").classList.remove('hidden');
//     } else{
//         document.querySelector(".audio").classList.add('hidden');
//     }
    
}

// function showAudio() {
//     var x = document.getElementById('audio');
//     if (x.style.display === 'none') {
//       x.style.display = 'block';
//     } else {
//       x.style.display = 'none';
//     }
//   }










async function getAudio(surahNumber,ayahsLength) {
    debugger
    for (i = 1; i < ayahsLength; i++) {
        const sesponse1 = await fetch("http://api.alquran.cloud/v1/ayah/" + surahNumber + ":" + i);
        const data1 = await sesponse1.json();
        var ayahNumber = data1.data.number
        srcAudio = "https://cdn.islamic.network/quran/audio/128/ar.alafasy/" + ayahNumber + ".mp3";

        
        document.querySelector("#audio").src = srcAudio
    }
}


async function Try() {
    const sesponse = await fetch("http://api.alquran.cloud/v1/ayah/89:7");
    const data = await sesponse.json();
    console.log(data)
    //  const sesponse1 = await fetch("https://legacy.quran.com/images/ayat_retina/1_7.png");
    // const data1 = await sesponse1.json();
    //console.log(data1);
}

//Try()