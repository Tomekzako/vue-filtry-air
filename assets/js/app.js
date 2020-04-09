$(document).ready(function() {
  Vue.component("category", {
    props: ["category"],
    methods: {
      getImgUrl(url) {
        return "assets/img/" + url;
      },
      selectCategory(id) {
        this.$emit("active", id);
      }
    },
    template: `
      <div class="phi_configurator-box" @click="selectCategory(category.id)" :class="{'phi_configurator-active': category.active}">
          <img :src="getImgUrl(category.url)" :alt="category.name" class="phi_configurator-img"/>
          <h4 class="phi_configurator-name">{{category.name}}</h4>
      </div>`
  });

  Vue.component("product", {
    props: ["product", "category"],
    methods: {
      getImgUrl(url) {
        if (this.category == 0) {
          return "assets/img/oczyszczacze/" + url + "/" + url + "-sm.png";
        } else if (this.category == 1) {
          return "assets/img/2w1/" + url + "/" + url + "-sm.png";
        } else {
          return "assets/img/nawilzacze/" + url + "/" + url + "-sm.png";
        }
      },
      selectProduct(id) {
        this.$emit("active", id);
      }
    },
    template: `
        <div class="phi_products-box" @click="selectProduct(product.fullName)" :class="{'phi_products-active': product.active}">
            <img :src="getImgUrl(product.name)" :alt="product.fullName" class="phi_products-img"/>
            <h4 class="phi_products-name">{{product.fullName}}</h4>
        </div>`
  });

  Vue.component("info", {
    props: ["info", "category"],
    computed: {
      showOperator() {
        return this.category == 2 && this.info.filtry.length > 1 && this.info.name != "HU5931_10" && this.info.name != "HU5930_10";
      }
    },
    methods: {
      getImgUrl(url) {
        if (this.category == 0) {
          return "assets/img/oczyszczacze/" + url + "/" + url + ".png";
        } else if (this.category == 1) {
          return "assets/img/2w1/" + url + "/" + url + ".png";
        } else {
          return "assets/img/nawilzacze/" + url + "/" + url + ".png";
        }
      },
      getFilterImg(url) {
        if (url == 0) {
          return "assets/img/filtry/filtr-hepa.jpg";
        } else if (url == 1) {
          return "assets/img/filtry/filtr-nawilzajacy-blue.jpg";
        } else if (url == 2) {
          return "assets/img/filtry/filtr-nawilzajacy-black.jpg";
        } else if (url == 3) {
          return "assets/img/filtry/filtr-nawilzajacy-white.jpg";
        } else if (url == 4) {
          return "assets/img/filtry/filtr-obrotowy.jpg";
        } else if (url == 5) {
          return "assets/img/filtry/filtr-weglowy.jpg";
        } else if (url == 6) {
          return "assets/img/filtry/filtr-wstepny.jpg";
        } else if (url == 7) {
          return "assets/img/filtry/filtr-nanoprotect.jpg";
        } else if (url == 8) {
          return "assets/img/filtry/filtr-zintegrowany-3w1.jpg";
        }
      },
      getStepsImg(folder, url) {
        if (this.category == 0) {
          return "assets/img/oczyszczacze/" + folder + "/" + url;
        } else if (this.category == 1) {
          return "assets/img/2w1/" + folder + "/" + url;
        } else {
          return "assets/img/nawilzacze/" + folder + "/" + url;
        }
      }
    },
    template: `
      <div v-if="info" class="phi_info">
        <div class="phi_wrapper">
          <div class="phi_row">
            <div class="phi_col phi_text-center">
              <h3 class="phi_heading phi_info-heading">Oczyszczacz powietrza <strong>Philips {{info.fullName}}</strong></h3>
            </div>
          </div>

          <div class="phi_row phi_vertical-center">
            <div class="phi_col-xs-12 phi_col-md-4 phi_info-overview phi_text-center">
              <img :src="getImgUrl(info.name)"/>
            </div>
            <div class="phi_col-xs-12 phi_col-md-8 phi_info-filtr">
              <div v-for="(filtr, i) in info.filtry" class="phi_info_overview-box" :key="i">
                <p class="phi_info_overview-text"><strong>{{filtr.title}}</strong><br>{{filtr.name}}</p>
                <img :src="getFilterImg(filtr.id)" :alt="info.name"/>
                <a href="#" class="phi_btn phi_info_overview-link">Kup ten filtr</a>
              </div>
              <p v-if="showOperator" class="phi_info-filtr-or">lub</p>
            </div>
          </div>
          <div class="phi_row phi_info-intro">
            <div class="phi_col phi_text-center">
              <h3 class="phi_heading phi_instructions-heading">Jak <strong>wymienić filtry:</strong></h3>
              <p class="phi_text">{{info.howToChangeFilter}}</p>
              <p v-if="info.howToChangeFilter2" class="phi_text">{{info.howToChangeFilter2}}</p>
            </div>
          </div>
          <div v-if="category !== 2" class="phi_row">
            <div class="phi_col">
              <table class="phi_instructions-table">
                <thead>
                  <tr>
                    <th class="phi_instructions-table-th">Jeżeli na wyświetlaczu pojawi się symbol:</th>
                    <th class="phi_instructions-table-th">Wykonaj następujące czynności:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in info.table" :key="i">
                    <td>{{item.name}}</td>
                    <td>{{item.desc}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="phi_row phi_instructions phi_vertical-center">
            <div class="phi_col-xs-12 phi_col-md-5 phi_text-center">
              <img :src="getImgUrl(info.name)" :alt="info.name" class="phi_instructions-img" />
                <a href="#" class="phi_instructions-video">
                  <img src="assets/img/zobacz-film-icon.png"/>
                  Zobacz video
                </a>
            </div>
            <div class="phi_col-xs-12 phi_col-md-7">
              <div class="phi_instructions_box" v-for="step in info.steps">
                <img :src="getStepsImg(info.name, step.img)" :alt="step.name" class="phi_instructions_box-img" />
                <div class="phi_instructions_box-info">
                  <h4>{{step.name}}:</h4>
                  <p>{{step.desc}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="phi_row">
            <div class="phi_col phi_text-center">
              <a class="phi_btn phi_configurator-btn" @click="$emit('reset')">Wybierz jeszcze raz</a>
            </div>
          </div>
        </div>
      </div>`
  });

  var app = new Vue({
    el: "#phi_configurator",
    components: {
      agile: VueAgile
    },
    data: {
      categoryOptions: {
        navButtons: true,
        slidesToShow: 1,
        dots: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 800,
            settings: {
              unagile: true
            }
          }
        ]
      },
      carouselOptions: {
        navButtons: true,
        slidesToShow: 1,
        dots: false,
        infinite: false,
        responsive: [
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3
            }
          }
        ]
      },
      showProducts: false,
      showDetails: false,
      slider: null,
      activeCat: null,
      activeProduct: null,
      productModel: "",
      noProducts: false,
      categories: [
        { id: 0, name: "Oczyszczacz powietrza", url: "oczyszczacz-powietrza.png", active: false },
        { id: 1, name: "Oczyszczacz i nawilżacz 2w1", url: "oczyszczacz-i-nawilzacz.png", active: false },
        { id: 2, name: "Nawilżacz", url: "nawilzacz.png", active: false }
      ],
      products: {
        0: [
          { name: "AC2887_10", fullName: "AC2887/10", active: false },
          { name: "AC3858_50", fullName: "AC3858/50", active: false },
          { name: "AC1214_10", fullName: "AC1214/10", active: false },
          { name: "AC1215_50", fullName: "AC1215/50", active: false },
          { name: "AC1217_50", fullName: "AC1217/50", active: false },
          { name: "AC2889_10", fullName: "AC2889/10", active: false },
          { name: "AC3055_50", fullName: "AC3055/50", active: false },
          { name: "AC3059_50", fullName: "AC3059/50", active: false },
          { name: "AC3256_10", fullName: "AC3256/10", active: false },
          { name: "AC3259_10", fullName: "AC3259/10", active: false },
          { name: "AC3854_50", fullName: "AC3854/50", active: false },
          { name: "AC4550_50", fullName: "AC4550/50", active: false },
          { name: "AC4558_50", fullName: "AC4558/50", active: false },
          { name: "AC5659_10", fullName: "AC5659/10", active: false },
          { name: "AC6608_10", fullName: "AC6608/10", active: false },
          { name: "AC4012_10", fullName: "AC4012/10", active: false }
        ],
        1: [
          { name: "AC2729_50", fullName: "AC2729/50", active: false },
          { name: "AC2729_51", fullName: "AC2729/51", active: false },
          { name: "AC4080_10", fullName: "AC4080/10", active: false },
          { name: "AC3829_10", fullName: "AC3829/10", active: false }
        ],
        2: [
          { name: "HU4706_50", fullName: "HU4706/50", active: false },
          { name: "HU4801_01", fullName: "HU4801/01", active: false },
          { name: "HU4803_01", fullName: "HU4803/01", active: false },
          { name: "HU4813_10", fullName: "HU4813/10", active: false },
          { name: "HU4816_10", fullName: "HU4816/10", active: false },
          { name: "HU5930_10", fullName: "HU5930/10", active: false },
          { name: "HU5931_10", fullName: "HU5931/10", active: false }
        ]
      },
      info: [
        //NAWILŻACZE
        {
          name: "HU4706_50",
          fullName: "HU4706/50",
          filtry: [
            { title: "1 filtr nawilżający (HU4136/30)", name: "do 3 miesięcy użytkowania", id: 3 },
            { title: "1 filtr nawilżający (HU4136/10)", name: "do 3 miesięcy użytkowania", id: 3 }
          ],
          howToChangeFilter:
            "Filtr należy wymieniać filtr co 3 miesiące, aby zapewnić wydajną pracę urządzenia. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający z wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc:
                "Zdejmij opakowanie z nowego filtra nawilżającego. Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc: "Umieść część górną z powrotem na zbiorniku wody. Podłącz oczyszczacz powietrza do zasilania."
            }
          ]
        },
        {
          name: "HU4801_01",
          fullName: "HU4801/01",
          filtry: [
            { title: "1 filtr nawilżający (FY2401/30)", name: "do 6 miesięcy użytkowania", id: 2 },
            { title: "1 filtr nawilżający (HU4102/01)", name: "do 3 miesięcy użytkowania", id: 3 }
          ],
          howToChangeFilter:
            "Filtr należy wymieniać filtr co 3 miesiące, aby zapewnić wydajną pracę urządzenia. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc: "Umieść część górną z powrotem na zbiorniku wody. Podłącz oczyszczacz powietrza do zasilania."
            }
          ]
        },
        {
          name: "HU4803_01",
          fullName: "HU4803/01",
          filtry: [
            { title: "1 filtr nawilżający (FY2401/30)", name: "do 6 miesięcy użytkowania", id: 2 },
            { title: "1 filtr nawilżający (HU4102/01)", name: "do 3 miesięcy użytkowania", id: 3 }
          ],
          howToChangeFilter:
            "Filtr należy wymieniać filtr co 3 miesiące, aby zapewnić wydajną pracę urządzenia. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc: "Umieść część górną z powrotem na zbiorniku wody. Podłącz oczyszczacz powietrza do zasilania."
            }
          ]
        },
        {
          name: "HU4813_10",
          fullName: "HU4813/10",
          filtry: [
            { title: "1 filtr nawilżający (FY2401/30)", name: "do 6 miesięcy użytkowania", id: 2 },
            { title: "1 filtr nawilżający (HU4102/01)", name: "do 3 miesięcy użytkowania", id: 3 }
          ],
          howToChangeFilter:
            "Filtr należy wymieniać filtr co 3 miesiące, aby zapewnić wydajną pracę urządzenia. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc:
                "Zdejmij opakowanie z nowego filtra nawilżającego. Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc: "Umieść część górną z powrotem na zbiorniku wody. Podłącz oczyszczacz powietrza do zasilania."
            }
          ]
        },
        {
          name: "HU4816_10",
          fullName: "HU4816/10",
          filtry: [{ title: "1 filtr nawilżający NanoCloud (FY2402/30)", name: "do 6 miesięcy użytkowania", id: 2 }],
          howToChangeFilter:
            "Filtr należy wymieniać filtr co 3 miesiące, aby zapewnić wydajną pracę urządzenia. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc:
                "Zdejmij opakowanie z nowego filtra nawilżającego. Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc: "Umieść część górną z powrotem na zbiorniku wody. Podłącz oczyszczacz powietrza do zasilania."
            }
          ]
        },
        {
          name: "HU5930_10",
          fullName: "HU5930/10",
          filtry: [
            { title: "1 filtr nawilżający NanoCloud (FY5156/10)", name: "do 1 roku użytkowania", id: 4 },
            { title: "1 filtr nawilżający NanoProtect (FY1114/10)", name: "do 1 roku użytkowania", id: 7 }
          ],
          howToChangeFilter:
            "Przed rozpoczęciem: Należy wymienić filtr, jeśli na ekranie miga kontrolka filtra. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc:
                "Usuń z nowego filtra wszystkie elementy opakowania. Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Naciśnij i przytrzymaj przycisk resetowania przez 3 sekundy, aby wyzerować licznik okresu użytkowania filtra NanoProtect."
            }
          ]
        },
        {
          name: "HU5931_10",
          fullName: "HU5931/10",
          filtry: [
            { title: "1 filtr nawilżający NanoCloud (FY5156/10)", name: "do 1 roku użytkowania", id: 4 },
            { title: "1 filtr nawilżający NanoProtect (FY1114/10)", name: "do 1 roku użytkowania", id: 7 }
          ],
          howToChangeFilter:
            "Przed rozpoczęciem: Należy wymienić filtr, jeśli na ekranie miga kontrolka filtra. Przed wymianą filtra nawilżającego należy zawsze odłączyć nawilżacz powietrza od zasilania.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij filtr nawilżający i wspornik filtra ze zbiornika wody. Wymontuj filtr nawilżający ze wspornika filtra. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc:
                "Usuń z nowego filtra wszystkie elementy opakowania. Zamontuj nowy filtr nawilżający wokół wspornika filtra. Włóż filtr i wspornik filtra z powrotem do zbiornika wody."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Naciśnij i przytrzymaj przycisk resetowania przez 3 sekundy, aby wyzerować licznik okresu użytkowania filtra NanoProtect."
            }
          ]
        },
        //OCZYSZCZACZE
        {
          name: "AC1214_10",
          fullName: "AC1214/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY1410)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY1413)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Dotknij blokady rodzicielskiej i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3858_50",
          fullName: "AC3858/50",
          filtry: [{ title: "1 Zintegrowany filtr 3w1 (FY4440/30) ", name: "do 3 lat użytkowania", id: 8 }],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy alarm wymiany filtra świeci na czerwono.",
          howToChangeFilter2:
            "Po zmianie filtrów umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [{ name: "Zapala się alarm wymiany filtra.", desc: "Wymień filtr zintegrowany filtr 3w1 (FY4440/30)" }],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, w ciągu 15 sekund od włączenia zasilania dotknij przycisków (rys. Krok 3) przytrzymaj je przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3854_50",
          fullName: "AC3854/50",
          filtry: [{ title: "1 Zintegrowany filtr 3w1 (FY4440/30) ", name: "do 3 lat użytkowania", id: 8 }],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy alarm wymiany filtra świeci na czerwono.",
          howToChangeFilter2:
            "Po zmianie filtrów umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [{ name: "Zapala się alarm wymiany filtra.", desc: "Wymień filtr zintegrowany filtr 3w1 (FY4440/30)" }],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, w ciągu 15 sekund od włączenia zasilania dotknij przycisków (rys. Krok 3) przytrzymaj je przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC1215_50",
          fullName: "AC1215/50",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY1410)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY1413)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Dotknij blokady rodzicielskiej i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC1217_50",
          fullName: "AC1217/50",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY1410)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY1413)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Dotknij blokady rodzicielskiej i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC2887_10",
          fullName: "AC2887/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY2422/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY2420/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Dotknij blokady rodzicielskiej i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC2889_10",
          fullName: "AC2889/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY2422/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY2420/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz oczyszczacz powietrza do zasilania. Dotknij blokady rodzicielskiej i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3256_10",
          fullName: "AC3256/10",
          filtry: [
            { title: "1 filtr węglowy (FY3432/10)", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr NanoProtect HEPA (FY3433/10)", name: "do 2 lat użytkowania", id: 0 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY3433)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY3432)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę  oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3259_10",
          fullName: "AC3259/10",
          filtry: [
            { title: "1 filtr węglowy (FY3432/10)", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr NanoProtect HEPA (FY3433/10)", name: "do 2 lat użytkowania", id: 0 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY3433)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY3432)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę  oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC4550_50",
          fullName: "AC4550/50",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY3433/10)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY3432/10)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "F0", desc: "Wyczyść filtr wstępny (zalecane co tydzień)" },
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY3433)" },
            { name: "C7", desc: "Wymień filtr z aktywnym węglem (FY3432)" },
            { name: "Na przemian A5 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC4558_50",
          fullName: "AC4558/50",
          filtry: [
            { title: "1 filtr węglowy (FY3432/10)", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr NanoProtect HEPA (FY3433/10)", name: "do 2 lat użytkowania", id: 0 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A5/C7.",
          howToChangeFilter2:
            "Po wymianie filtra umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A5", desc: "Wymień filtr NanoProtect (FY3433)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY3432)" },
            { name: "Na przemian A5 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC5659_10",
          fullName: "AC5659/10",
          filtry: [
            { title: "2 filtry NanoProtect HEPA (FY5185/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "2 filtry węglowe (FY5182/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A5/C7. Po wymianie filtra umyj ręce.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect z serii 3 (FY5185)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY5182)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC6608_10",
          fullName: "AC6608/10",
          filtry: [
            { title: "2 filtry NanoProtect HEPA (FY6172/30)", name: "do 2 lat użytkowania", id: 0 },
            { title: "2 filtry węglowe (FY6171/30)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A5/C7.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          table: [
            { name: "A5", desc: "Wymień filtr NanoProtect HEPA3 (FY6172)" },
            { name: "C7", desc: "Wymień filtr NanoProtect AC (FY6171)" },
            { name: "Na przemian A5 i C7", desc: "Wymień filtr NanoProtect S3 HEPA i filtr NanoProtect AC" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3055_50",
          fullName: "AC3055/50",
          filtry: [{ title: "1 Zintegrowany filtr 3w1 (FY3430/30)", name: "do 3 lat użytkowania", id: 8 }],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy alarm wymiany filtra świeci na czerwono.",
          howToChangeFilter2:
            "Po zmianie filtrów umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [{ name: "Zapala się alarm wymiany filtra.", desc: "Wymień filtr zintegrowany filtr 3w1 (FY4440/30)" }],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, w ciągu 15 sekund od włączenia zasilania dotknij przycisków (rys. Krok 3) przytrzymaj je przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3059_50",
          fullName: "AC3059/50",
          filtry: [{ title: "1 Zintegrowany filtr 3w1 (FY3430/30)", name: "do 3 lat użytkowania", id: 8 }],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy alarm wymiany filtra świeci na czerwono.",
          howToChangeFilter2:
            "Po zmianie filtrów umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [{ name: "Zapala się alarm wymiany filtra.", desc: "Wymień filtr zintegrowany filtr 3w1 (FY4440/30)" }],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Włącz urządzenie, w ciągu 15 sekund od włączenia zasilania dotknij przycisków (rys. Krok 3) przytrzymaj je przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC4012_10",
          fullName: "AC4012/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (AC4124/10)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (AC4123/10)", name: "do 1 roku użytkowania", id: 5 }
          ],
          howToChangeFilter:
            "Przed rozpoczęciem: Należy wymienić filtry, wskaźnik wymiany filtra informuje o konieczności wymiany filtrów.",
          howToChangeFilter2:
            "Po zmianie filtrów umyj ręce. Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza.",
          table: [
            {
              name: "Wskaźnik wymiany filtra świeci się cały czas.",
              desc: "Filtr jest pełny. Wymień filtr i zresetuj okres użytkowania filtra."
            }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyłącz oczyszczacz powietrza i odłącz go od zasilania. Wyjmij zużyty filtr powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyty filtr."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę  oczyszczacza powietrza do zasilania. Włącz urządzenie, naciśnij przycisk resetowania i przytrzymaj przez 2 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        //2w1
        {
          name: "AC2729_50",
          fullName: "AC2729/50",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30) ", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30) ", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr obrotowy (FY2425/30)", name: "", id: 4 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij zużyte filtry powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyte filtry."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC2729_51",
          fullName: "AC2729/51",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30) ", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30) ", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr obrotowy (FY2425/30)", name: "", id: 4 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij zużyte filtry powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyte filtry."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC3829_10",
          fullName: "AC3829/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (FY1410/30) ", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr węglowy (FY1413/30) ", name: "do 1 roku użytkowania", id: 5 },
            { title: "1 filtr obrotowy (FY2425/30)", name: "", id: 4 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij zużyte filtry powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyte filtry."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        },
        {
          name: "AC4080_10",
          fullName: "AC4080/10",
          filtry: [
            { title: "1 filtr NanoProtect HEPA (AC4158/00)", name: "do 2 lat użytkowania", id: 0 },
            { title: "1 filtr nawilżający (AC4155/00)", name: "do 3 miesięcy użytkowania", id: 1 }
          ],
          howToChangeFilter: "Przed rozpoczęciem: Należy wymienić filtr, gdy na ekranie miga A3/C7.",
          howToChangeFilter2:
            "Nie dotykaj pofałdowanej powierzchni filtra i nie wąchaj go, ponieważ nagromadziły się na nim zanieczyszczenia z powietrza. Po zmianie umyj ręce.",
          table: [
            { name: "A3", desc: "Wymień filtr NanoProtect HEPA z serii 3 (FY2422)" },
            { name: "C7", desc: "Wymień aktywny filtr węglowy NanoProtect (FY2420)" },
            { name: "Na przemian A3 i C7", desc: "Wymień oba filtry" }
          ],
          steps: [
            {
              name: "Krok 1",
              img: "krok1.png",
              desc:
                "Wyjmij zużyte filtry powietrza zgodnie ze stanem wskaźnika ostrzegawczego filtra wyświetlanym na ekranie. Wyrzuć zużyte filtry."
            },
            {
              name: "Krok 2",
              img: "krok2.png",
              desc: "Usuń z nowego filtra wszystkie elementy opakowania. Umieść nowe filtry w oczyszczaczu powietrza."
            },
            {
              name: "Krok 3",
              img: "krok3.png",
              desc:
                "Podłącz wtyczkę oczyszczacza powietrza do zasilania. Naciśnij przycisk resetowania i przytrzymaj przez 3 sekundy, aby zresetować licznik okresu użytkowania filtra."
            }
          ]
        }
      ]
    },
    computed: {
      selectedProducts() {
        if (this.activeCat !== null) {
          return this.products[this.activeCat].filter(el => el.name.includes(this.productModel));
        }
      },
      productDetails() {
        return this.info.filter(el => el.fullName == this.activeProduct);
      }
    },
    watch: {
      selectedProducts() {
        if (this.activeCat !== null) {
          this.selectedProducts.length == 0 ? (this.noProducts = true) : (this.noProducts = false);
        }
      },
      productModel() {
        if (this.selectedProducts.length > 0) {
          this.$nextTick(() => {
            this.$refs.carousel.reload();
            this.$refs.carousel.goTo(0);
            this.showDetails = false;
          });
        }
      },
      activeCat(newCat, oldCat) {
        if (newCat !== null) {
          this.$nextTick(() => {
            this.$refs.carousel.reload();
            this.$refs.carousel.goTo(0);
            this.autoScrollTo("phi_products");
          });
        }
      },
      activeProduct(newProduct, oldProduct) {
        if (newProduct !== null) {
          this.$nextTick(() => {
            this.autoScrollTo("phi_info");
          });
        }
      }
    },
    methods: {
      setActiveCat(i) {
        this.categories.forEach(el => {
          el.active = false;
        });
        this.activeCat = i;
        this.activeProduct = null;
        this.categories[i].active = true;
        this.showProducts = true;
        this.productModel = "";
      },
      setActiveProduct(i) {
        this.activeProduct = i;
        this.showDetails = true;
        this.products[this.activeCat].forEach(el => {
          el.active = false;
          if (el.fullName == this.activeProduct) {
            el.active = true;
          }
        });
      },
      reset() {
        this.autoScrollTo("phi_configurator_intro");
        setTimeout(() => {
          this.products[this.activeCat].forEach(el => {
            el.active = false;
          });
          this.categories.forEach(el => {
            el.active = false;
          });
          this.activeProduct = null;
          this.activeCat = null;
          this.showProducts = false;
          this.showDetails = false;
        }, 510);
      },
      autoScrollTo(el) {
        var top = $("." + el).offset().top;
        $("html, body").animate({ scrollTop: top }, 500);
      }
    }
  });
});
