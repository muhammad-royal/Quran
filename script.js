var AyaNumber = [1, 8, 294, 494, 670, 790, 955, 1161, 1236, 1365, 1474, 1597, 1708, 1751, 1803, 1902, 2030, 2141, 2251, 2349, 2484, 2596, 2674, 2792, 2856, 2933, 3160, 3253, 3341, 3410, 3470, 3504, 3534, 3607, 3661, 3706, 3789, 3971, 4059, 4134, 4219, 4273, 4326, 4415, 4474, 4511, 4546, 4584, 4613, 4631, 4676, 4736, 4785, 4847, 4902, 4980, 5076, 5105, 5127, 5151, 5164, 5178, 5189, 5200, 5218, 5230, 5242, 5272, 5324, 5376, 5420, 5448, 5476, 5496, 5552, 5592, 5623, 5673, 5713, 5759, 5801, 5830, 5849, 5885, 5910, 5932, 5949, 5968, 5994, 6024, 6044, 6059, 6080, 6091, 6099, 6107, 6126, 6131, 6139, 6147, 6158, 6169, 6177, 6180, 6189, 6194, 6198, 6205, 6208, 6214, 6217, 6222, 6226, 6231
]

$('#txt-search').on('input', lll);
function lll(e, isFocus) {
    if (isFocus && $('#filter-records').is(':visible')) {
        return;
    }
    debugger
    var searchField = $(e.target).val();
    $('#filter-records').hide();
    $('#sura-block').hide();
    $('#aya-block').hide();
    if (searchField === '') {
        return;
    } else {
        $('#filter-records').show();
        searchField = toStandardText(searchField)
    }

    let suraResult = '';
    let ayaResult = '';
    let resultCount = 0;
    $.each(arabic.data.surahs, function (key, val) {
        let suraName = toStandardText(val.name);
        let suraNumber = '' + val.number;
        let suraEName = val.englishName.toLowerCase();
        if (suraName.indexOf(searchField) > -1 || suraNumber.indexOf(searchField) > -1 || suraEName.indexOf(searchField) > -1) {
            suraResult += '<div class="sura-result-div dodo" onclick="Surah1(' + suraNumber + ')">';
            suraResult += '<div class="sura-name">';
            suraResult += val.number;
            suraResult += ' ';
            suraResult += val.name;
            suraResult += '</div>';
            suraResult += '<div class="sura-ename">';
            suraResult += val.englishName;
            suraResult += '</div>';
            suraResult += '</div>';
        }

        let ayaResultInSura = '';

        $.each(val.ayahs, function (ayaKey, ayaVal) {
            let ayaText = toStandardText(ayaVal.text);
            let ayaNumber = '' + ayaVal.numberInSurah;
            if (ayaText.indexOf(searchField) > -1 || ayaNumber.indexOf(searchField) > -1) {
                ayaResultInSura += '<div onclick="openAya()" class="dodo aya-text">';
                ayaResultInSura += ayaVal.text;
                ayaResultInSura += '(';
                ayaResultInSura += ayaVal.numberInSurah;
                ayaResultInSura += ')';
                ayaResultInSura += '</div>';
                resultCount += (ayaText.split(searchField).length - 1);
            }
        });

        if (ayaResultInSura) {
            ayaResult += '<div>';
            ayaResult += '<div class="aya-name-sura">';
            ayaResult += val.name;
            ayaResult += '</div>';
            ayaResult += '<div>';
            ayaResult += ayaResultInSura;
            ayaResult += '</div>';
            ayaResult += '</div>';

        }

    });
    //debugger;
    //alert(resultCount);
    $('#result-count').text(resultCount);

    if (suraResult) {
        $('#sura-block').show();
        $('#sura-results').html(suraResult);
        $('#no-result').hide();
    }

    if (ayaResult) {
        $('#aya-block').show();
        $('#aya-results').html(ayaResult);
        $('#no-result').hide();
    }

    if (!ayaResult && !suraResult) {
        $('#no-result').show();
    }



}


//......table of surahs........
async function SurahsTable() {
    const sesponse = await fetch("http://api.alquran.cloud/v1/surah");
    const data = await sesponse.json();
    //console.log(data.data);
    for (i = 0; i < data.data.length; i++) {

        var su = '<button class="btn btn-primary " style="margin : 13px;" onclick="Surah1(' + (i + 1) + ')">';
        su += '<div >' + data.data[i].name + ' </div>';
        su += '<div >' + data.data[i].englishName + '</div>';
        su += '<div >(' + data.data[i].number + ')</div>';
        su += "</button>";

        $("#surahTable").append(su)
    }

}
//SurahsTable()


//.....selector code.....
async function getSelector() {

    const response = await fetch("http://api.alquran.cloud/v1/surah")
    const data = await response.json()

    x = data.data.length;

    // console.log(x)
    var su = '<select class="form-select" size="5" aria-label="size 3 select example" onchange="Surah1(this.value)">';
    su += '<option> إختر السورة</option>';
    for (i = 0; i < data.data.length; i++) {
        su += '<option value="' + (i + 1) + '">' + (i + 1) + " - " + data.data[i].name + "  " + data.data[i].englishName + '</option>';
    }
    su += '</select>';
    $("#selector").append(su);

    console.log()
}
//getSelector()


//.....Main Code........
async function Surah1(surahNumber) {
    var ayahsLength = AyaNumber[surahNumber] - AyaNumber[surahNumber - 1];

    $('#surahTable').hide(900);
    $("#verses").empty();
    var x = 1;
    var aya = '';


    if (surahNumber > 1 && surahNumber != 9) {

        aya += '<div class="ayahBox1" id="ayaid"> <h1>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h1></div>'

    }

    for (i = 0; i < ayahsLength; i++) {

        aya += '<div class="ayahBox1" id="Box-' + (i) + '"> <div class"qu-tf-text"><div class="ayaclass" id="ayaid-' + (i) + '"><h1>';
        aya += arabic.data.surahs[surahNumber - 1].ayahs[i].text + '﴿' + (i + x) + '﴾'
        aya += '</h1></div> <div id="tafser' + (i) + '" class="tafser"></div></div> <div calss"audioImgs" ><img src="images/play.png" id="playAudioImg' + (i) + '"class="playAudioImg" type="button" onclick="play_audio(' + (i) + ')"> <img src="images/pause.png" id="pauseAudioImg' + (i) + '"   class="pauseAudioImg" type="button" onclick="pause_audio()"></div></div></div>';

    }
    $("#verses").append(aya);
    $('#select').val(surahNumber);
    Tafser181();
    Audio101();
}

function Audio101() {
    debugger
    setTimeout(async () => {
        var surahNumber = $('#select').val();
        var muratel = $('#selectMuratel').val();
        var ayahsLength = AyaNumber[surahNumber] - AyaNumber[surahNumber - 1];
        audioSrc = [];
        // currentAyaIndex = 0;
        if (surahNumber == 1) {
            ayahsLength = 7;
        }
        for (i = 0; i < ayahsLength; i++) {


            var ayahNumber = AyaNumber[surahNumber - 1] + i;
            srcAudio = "https://cdn.islamic.network/quran/audio/64/" + muratel + "/" + ayahNumber + ".mp3";
            audioSrc.push(srcAudio);
        }
        $('#audio-808').attr('src', audioSrc[0]);

    }, 10);


}


var audioSrc = [];
var currentAyaIndex = 0;
function nextAya() {
    //debugger
    $('#pauseAudioImg' + currentAyaIndex).hide();
    $('#playAudioImg' + currentAyaIndex).show();

    if (currentAyaIndex + 1 < audioSrc.length) {
        play_audio(currentAyaIndex + 1);

    }
}



//...auto play audio....
var curraya1;
function play_audio(j) {
    debugger
    curraya1 = j;
    currentAyaIndex = j;


    $('.playAudioImg').show();
    $('.pauseAudioImg').hide();
    audio.src = audioSrc[currentAyaIndex];
    audio.play();
    //$('#audio-808').attr('src', audioSrc[currentAyaIndex]);
    //$('#audio-808').trigger('load');
    //$('#audio-808').trigger('play');
    $('#playAudioImg' + currentAyaIndex).hide();
    $('#pauseAudioImg' + currentAyaIndex).show();
    $('.current-aya').removeClass('current-aya');
    $('#Box-' + currentAyaIndex).addClass('current-aya');
    window.location.hash = '#Box-' + currentAyaIndex;


}
function pause_audio() {
    //$('#audio-808').trigger('pause');
    audio.pause();
    $('#audio-808').prop("currentTime", 0);
    $('.playAudioImg').show();
    $('.pauseAudioImg').hide();
}



//......to show hidden audio.....
function showAudio() {
    $('.audio').toggleClass('hidden');

}



async function Tafser181() {
    debugger
    $(".tafser").empty(200);
    var surahNumber = $('#select').val();
    var ayahsLength = AyaNumber[surahNumber] - AyaNumber[surahNumber - 1];
    var tafser_id = $('#selectTafser').val();
    var startaya = AyaNumber[surahNumber - 1];
    var tafaya = '';

    const taf_Response = await fetch('./tafser/tafser' + tafser_id + '.json');
    const taf_Data = await taf_Response.json();
    console.log(taf_Data);

    for (i = 0; i < ayahsLength; i++) {

        tafaya = '<h5>' + taf_Data[startaya + i - 1].text + '</h5>';
        document.querySelector("#tafser" + i).innerHTML = (tafaya);
    }


}


var arr = [];
async function Tafser() {

    // for (k=2;k<13;k++) {
    for (j = 1; j < 115; j++) {
        var ayalength = AyaNumber[j] - AyaNumber[j - 1];
        for (i = 1; i <= ayalength; i++) {

            const taf_Response = await fetch('http://api.quran-tafseer.com/tafseer/' + 5 + '/' + j + '/' + i)
            const taf_Data = await taf_Response.json()

            arr.push(taf_Data);

        }
    }
    // }
    console.log(arr)

}
//Tafser();


function goUP() {
    debugger
    $('html').scrollTop(0);
    //window.location.hash = '#Box-' + 1
}


function testTest(e) {
    debugger
    if ($('#filter-records').is(':visible') && (e.target.id == "txt-search" || e.target.id == "filter-records" || $(e.target).parents("#filter-records").length)) {
    } else {
        $('#filter-records').hide(100);
    }
}









// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
    "https://cdn.islamic.network/quran/audio/64/1/1.mp3"
);
//credit for song: Adrian kreativaweb@gmail.com

audio.addEventListener(
    "loadeddata",
    () => {
        audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
            audio.duration
        );
        audio.volume = .75;
    },
    false
);


audio.addEventListener(
    "ended",
    nextAya
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

//check audio percentage and update time accordingly
setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
        } else {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
        }
    },
    false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
    } else {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
    }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}


function toStandardText(str) {
    return str.replace(/[ًٌٍَُِّْ]/g, '').replace(/ٱ/g, 'ا').replace(/أ/g, 'ا').replace(/إ/g, 'ا').replace(/آ/g, 'ا').replace(/ي/g, 'ى');
}