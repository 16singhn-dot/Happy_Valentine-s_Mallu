export interface GiftContent {
  letter: string
  videoSrc: string
  shayari: {
    title: string
    text: string
    audioSrc: string
  }
}

// Each gift maps to an index (0-9). Total of 10 gifts for the complete constellation.
// Videos (The Edit section): Place your video files in public/videos/ as edit1.mp4, edit2.mp4, ... edit10.mp4.
// Source folder: C:\Nirupam\Mallu\Edit — copy from there and rename to edit1.mp4, edit2.mp4, etc.
// When all 10 gifts are opened, the constellation completes and the "Golden Rain" celebration triggers.
export const giftContents: GiftContent[] = [
  {
    letter:
      "Tumse pehle zindagi mein rang to the, par tumne unhe roshni di. Har subah tumhari muskurahat se shuru hoti hai, aur har raat tumhari yaad mein guzarti hai. Tum meri duniya ki sabse khoobsurat hakikat ho.",
    videoSrc: "/videos/edit1.mp4",
    shayari: {
      title: "Pehli Nazar",
      text: "Pehli nazar mein kuch aisa jadoo tha, ke har lamha tumhara hi charcha tha. Ankhein mili to zamana ruk gaya, jaise waqt bhi tumhara aashiq tha.",
      audioSrc: "/audio/shayari1.mp3",
    },
  },
  {
    letter:
      "Kabhi socha nahi tha ke koi itna apna lagega. Par tum aayi aur sab badal gaya. Tumhari awaaz mein wo sukoon hai jo kahin aur nahi milta. Tum mere liye sirf mohabbat nahi, ghar ho.",
    videoSrc: "/videos/edit2.mp4",
    shayari: {
      title: "Tumhari Awaaz",
      text: "Tumhari awaaz mein wo suroor hai, jaise chand ki roshni mein noor hai. Sunte hi dil ko chain aa jaye, ye kaisi meethi majboor hai.",
      audioSrc: "/audio/shayari2.mp3",
    },
  },
  {
    letter:
      "Kuch log kehte hain mohabbat mushkil hai. Par tumhare saath ye sab itna sahaj hai. Har chhoti baat mein khushi dhundh lete hain hum. Ye hamari kahaani ka sabse sunhera hissa hai.",
    videoSrc: "/videos/edit3.mp4",
    shayari: {
      title: "Chhoti Khushiyan",
      text: "Chhoti chhoti khushiyon mein basi hai mohabbat, ek chai ki pyali mein chhupi hai chahat. Tumhare saath guzra har pal sunhera hai, ye dil kehta hai bas yehi ibadat hai.",
      audioSrc: "/audio/shayari3.mp3",
    },
  },
  {
    letter:
      "Jab tum hansti ho, toh lagta hai saari duniya ke dard mit gaye. Tumhari hansi mein wo taaqat hai jo hazaron duwaaon mein nahi. Main hamesha ye hansi dekhna chahta hoon, har roz, har lamha.",
    videoSrc: "/videos/edit4.mp4",
    shayari: {
      title: "Tumhari Hansi",
      text: "Tumhari hansi mein gulaab ki khushboo hai, jaise sawan ki pehli baarish ka mausam. Jab tum hansti ho duniya ruk jaati hai, dil kehta hai bas yahi hai mera imaan.",
      audioSrc: "/audio/shayari4.mp3",
    },
  },
  {
    letter:
      "Tum jaanti ho na, mujhe alfaazon mein kehna mushkil lagta hai. Par ye khat padh kar samajh lena ke tum meri zindagi ki sabse haseen nazm ho. Koi aur nahi le sakta tumhari jagah, kabhi nahi.",
    videoSrc: "/videos/edit5.mp4",
    shayari: {
      title: "Khamoshi Ka Bayaan",
      text: "Khamoshi mein bhi itni baat hoti hai, tumhari ek nazar mein kaaynat hoti hai. Alfaaz kam padh jaate hain kabhi, par dil ki zuban pe tumhari baat hoti hai.",
      audioSrc: "/audio/shayari5.mp3",
    },
  },
  {
    letter:
      "Agar mujhe dobara zindagi mile, toh main phir se tujhe dhundhun. Har janam mein, har daur mein, bas tujhe. Kyunki tere bina ye sab adhura hai, aur tere saath ye sab jannat hai.",
    videoSrc: "/videos/edit6.mp4",
    shayari: {
      title: "Har Janam Mein",
      text: "Har janam mein tujhe dhundhunga main, har pal tere naam karunga main. Tu meri taqdeer ka sabse roshan sitaara hai, tujhpe fida har baar hounga main.",
      audioSrc: "/audio/shayari6.mp3",
    },
  },
  {
    letter:
      "Tumhare saath har lamha ek naya shuru hai. Jo kal ho gaya wo yaad hai, par aaj tumhare haath mein sab kuch nayi umeed le aata hai. Main bas tumhare paas rehna chahta hoon, hamesha, hamesha.",
    videoSrc: "/videos/edit7.mp4",
    shayari: {
      title: "Nayi Umeed",
      text: "Nayi umeed mein palti hai meri rooh, jab tum mere paas ho. Tere bina jo tanha tha mera dil, ab tere saath wo poora hai, wo sukoot aur raah.",
      audioSrc: "/audio/shayari7.mp3",
    },
  },
  {
    letter:
      "Kuch log se mulakat ek lamha hoti hai, par tumse ye ek zindagi ban gayi. Har smile, har tear, har moment—sab tumhare naam ho gaya. Tum mera present, mera past, aur mera poora future ho.",
    videoSrc: "/videos/edit8.mp4",
    shayari: {
      title: "Ek Zindagi",
      text: "Ek zindagi kaafi nahi teri yaad ke liye, par yeh jo ek zindagi hai, vo tere naam kar doonga. Har sooch, har sapna, har raah—sirf tere liye, sirf tumhara.",
      audioSrc: "/audio/shayari8.mp3",
    },
  },
  {
    letter:
      "Tum muj mein aisi khushi ho jaagi jis ko main kahi bhar na kar sakon. Tum ek ehsaas ho jo mere har hote se gehra hai. Tumhara hona mere saath sabse bada sukh hai.",
    videoSrc: "/videos/edit9.mp4",
    shayari: {
      title: "Sukh Ka Ehsaas",
      text: "Sukh ke lamhon mein basa hai tera chehra, dard ke pal mein teri yaad mere paas. Tu jeevan ki sabse pyari baat hai, tujhkrke zindagi mera raag hai.",
      audioSrc: "/audio/shayari9.mp3",
    },
  },
  {
    letter:
      "Yeh sab khatam ho jayega, par tum rahogi. Kal ho ya kal hoye, tum mere dil mein roshni ho. Noor mera ek naam nahi, vo tum ho. Hamesha, har pal, har saans.",
    videoSrc: "/videos/edit10.mp4",
    shayari: {
      title: "Hamesha Tum",
      text: "Hamesha tum, har janam mein tum, har pal tum mere dil mein. Tum meri roshni ho, mera noor, mera kul kaaynat. Bas tum, hamesha bas tum.",
      audioSrc: "/audio/shayari10.mp3",
    },
  },
]
