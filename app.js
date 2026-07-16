import { createAudio } from './js/audio.js';
import { createVisualizer } from './js/visualizer.js';

const { createApp, ref } = Vue;
const audio = createAudio();
const visualizer = createVisualizer(audio.element, 'visualizer');
document.body.appendChild(audio.element);

createApp({
  setup() {
    const bio = ref([
      'Dr. Dereje Kebede was born in Addis Ababa around 1957/58. He grew up carrying heavy family responsibilities: his parents passed away when he was young, and his elder brother, songwriter Million Kebede, was killed during the Ethiopian Revolution.',
      'A song by the Mulu Wongel Tsion Choir called "Heal me Jesus" changed his life and gave him the desire to serve God through music. He joined the choir of Meserete Kristos Church in Bole and later became a solo singer.',
      'Dereje was the first Ethiopian gospel singer to publish an audio cassette. He also introduced electronic keyboard and Ethiopian traditional instruments into gospel recordings, shaping the sound of the genre.',
      'During the military regime, he refused to compose revolutionary songs and stood against the state atheist ideology. Because of this, he was imprisoned for six months. In the early 1980s he left Ethiopia, first to Kenya and later to the United States.',
      'He holds degrees in Agriculture, Religious Education, Addiction Science and Health Science. He worked as a nurse and now serves as a health policy consultant and addiction therapist.Through all of this, his songs have touched many Ethiopian Christians and beyond.'
    ]);

    const albums = ref([
      {
        title: 'Album 1',
        amharic: 'አንደኛ ካሴት',
        lyricsUrl: 'https://wikimezmur.org/am/Dereje_Kebede/Album_1',
        songs: ['ምሥጋና ዕልልታ', 'ያለፈው በደሌን ተወው', 'ትዝ ይለኛል', 'መናህ ይጥመኛል', 'ቆሜ ብጠብቅህ እስከ መገለጥህ', 'የአንተን ድምጽ ስሰማ ነቃለሁ', 'ጌታን አመልካለሁ']
      },
      {
        title: 'Mengeste Semay',
        amharic: 'መንግሥተ ሰማይ',
        lyricsUrl: 'https://wikimezmur.org/am/Dereje_Kebede',
        songs: ['ድንቅ ሥራ', 'እግዚአብሔር ሰውን ቢሆን', 'መንገዴን በፊቱ አጸናለሁ', 'ብልህ ሰው ነፍሱን ያድናል', 'የንጋቱ ኮከብ አበራ', 'ውበት ይረግፋል', 'ማረን አቤቱ', 'መዳን ይሆንልናል', 'ሰላም አለኝ', 'ትህትና ሊያስተምረኝ', 'እኔስ በሕይወቴ ልበርታ']
      },
      {
        title: 'Collection',
        amharic: 'ስብስብ',
        lyricsUrl: 'https://wikimezmur.org/am/Dereje_Kebede/Collection',
        songs: ['አቤት እንዴት ታላቅ ነህ', 'አመልካለሁ', 'አምላኬ እረኛዬ ነው', 'አንድ ነገር', 'አዎን ያያል', 'ወንዙ ከፊት ሲታይህ', 'ድል በድል ጐዳና', 'ጌታ ቅደምልኝ', 'ጌታ ረዳቴ ነው', 'ግሩም ነው ድንቅ ነው', 'እንዴት ድንቅ አምላክ ነው', 'እኔን ጌታ ሆይ']
      },
      {
        title: 'Adagnie Yesus',
        amharic: 'አዳኜ ኢየሱስ',
        lyricsUrl: 'https://wikimezmur.org/am/Dereje_Kebede',
        songs: ['አዳኜ ኢየሱስ', 'ዓለምን እንዳላይ', 'ለጥሞና ጊዜ አጣሁኝ', 'መዝሙር ፳፪', 'የሚመጣ', 'ኢየሩሳሌም', 'ወጥመዱ ተሰበረ', 'ጭንቀቴን ላዋየው', 'ሮጦ ሮጦ', 'ዞር ብዬ ሳየው', 'ሰላም ወዴት አለሽ', 'ይቅርታን ለማድረግ', 'አሃዱ እላለሁኝ']
      },
      {
        title: 'Zem Alelem',
        amharic: 'ዝም አልልም',
        lyricsUrl: 'https://wikimezmur.org/am/Dereje_Kebede',
        songs: ['ወረት አያውቀው ጌታዬ', 'ዝንጀሮ አይደለሁም', 'የማይደፈርስ ሰላም አለኝ', 'ናፍቆታቸው ሰርጾብኛል', 'ዝም አልልም', 'ጋርዳቸው ከመታከት', 'ይሰባሰባሉ', 'ይቅርታን ለማድረግ', 'መከራ ሳይመጣ', 'ጭንቀቴን ላዋየው', 'ጸልይለት']
      }
    ]);

    return { bio, albums };
  }
}).mount('#app');

function initMedia() {
  const overlay = document.getElementById('enter-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const muteBtn = document.getElementById('mute-btn');
  const trackLabel = document.getElementById('track-label');

  if (!overlay || !enterBtn) return;

  trackLabel.textContent = audio.currentLabel();

  enterBtn.addEventListener('click', async () => {
    overlay.classList.add('hidden');
    await audio.play();
    visualizer.start();
  });

  muteBtn.addEventListener('click', () => {
    const muted = audio.toggleMute();
    muteBtn.textContent = muted ? '🔇 Unmute' : '🔊 Mute';
  });
}

initMedia();
