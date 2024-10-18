<template>
  <section class="section hero" v-if="home">
    <div class="section_in hero__in">
      <div class="hero__row">
        <div class="hero__col hero__col--info">
          <div class="hero__info">
            <h1 class="hero__title" v-html="home.acf.hero_title"></h1>
            <div class="hero__descr" v-html="home.acf.hero_txt"></div>
            <div class="hero__btn_w">
              <a
                class="hero__link btn_base"
                href="#"
                @click.prevent="openModal('form', 'call')"
                >Получить консультацию</a
              ><a
                class="hero__link btn_base"
                href="#"
                @click.prevent="openModal('form', 'price')"
                >Отправить проект на просчет</a
              >
            </div>
          </div>
        </div>
        <div class="hero__col hero__col--img">
          <div class="hero__img_w">
            <img class="hero__img" :src="home.acf.hero_img.url" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <QuizForm />

  <section class="section system">
    <div class="section_in system__in">
      <div class="system__row">
        <div class="system__col system__col--img">
          <h2 class="system__title">Технология строительства "МСБК"©</h2>
          <div class="system__img_box">
            <div class="system__img_w">
              <img
                class="system__img"
                src="@/assets/images/system/system.jpg"
              />
            </div>
          </div>
        </div>
        <div class="system__col system__col--info">
          <div class="system__info_img_box">
            <div class="system__info_img_w">
              <img
                class="system__info_img"
                src="@/assets/images/system/0.jpg"
              />
            </div>
            <div class="system__info_img_w">
              <img
                class="system__info_img"
                src="@/assets/images/system/1.jpg"
              />
            </div>
          </div>
          <div class="system__info_about">
            <div class="system__info_about_title">
              Проектирование и изготовление металлических каркасов домов
            </div>
            <div class="system__info_about_descr">
              Возведение каркаса здания из металлоконструкции, собранной из
              оцинкованной стали, произведенного автоматической линией с
              технологическими отверстиями и пазами. Каркас с обеих сторон
              обшивается плитным материалом, который является несъемной
              опалубкой, полости заполняются полистиролбетоном, который делает
              конструкцию монолитной и теплой
            </div>
            <a
              class="btn_base_s system__info_about_btn"
              href="#"
              @click.prevent="openModal('form')"
              >Получить консультацию</a
            >
          </div>
          <div class="system__info_about system__info_about--green">
            <div class="system__info_about_title">МСБК</div>
            <div class="system__info_about_descr">
              Иновационная технология строительства жилых домов и коммерческих
              зданий комфорт-класса
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section adv">
    <div class="section_in adv__in">
      <h2 class="adv__title">
        <strong>ПРЕИМУЩЕСТВА ТЕХНОЛОГИИ </strong> «МСБК»
      </h2>
      <div class="adv__info_row">
        <div class="adv__info">
          По теплоизоляционным свойствам полистиролбетон значительно превосходит
          кирпич и является лучшим среди легких бетонов. При заливке
          полистиролбетона исключается возникновение мест с повышенным
          теплообменом между наружным и внутренним контуром здания на протяжении
          всего периода эксплуатации.
        </div>
        <ul class="adv__info_list">
          <li class="adv__info_item">Высокая скорость возведения</li>
          <li class="adv__info_item">Идеальная геометрия стен и потолка</li>
          <li class="adv__info_item">Универсальность</li>
          <li class="adv__info_item">Экологичность</li>
          <li class="adv__info_item">Безупречная шумоизоляция</li>
          <li class="adv__info_item">Энергоэффективность</li>
          <li class="adv__info_item">Пожаропрочность</li>
          <li class="adv__info_item">Сейсмоустойчивость</li>
        </ul>
      </div>
      <div class="adv__about">
        <div class="adv__about_descr">
          <p>
            Древесная омыленная смола (СДО), входящая в состав полистиролбетона,
            подавляет рост патогенной микрофлоры (бактерий, грибов), т.е.
            препятствует образованию плесени и гниению.
          </p>
          <p>
            Входящие в состав полистиролбетона компоненты безопасны для здоровья
            и окружающей среды: вспененный полистирол используется для
            изготовления упаковок для продуктов, одноразовой посуды,
            детскихигрушек, одноразовых медицинских инструментов.
          </p>
          <p>
            Полистиролбетон в Двойном каркасе МСБК не препятствуютвоздухообмену,
            т. е. стены способны «дышать», а благодаря высокой паропроницаемости
            — регулировать влажность воздуха.
          </p>
        </div>
        <div class="adv__img_w">
          <img
            class="adv__img"
            src="https://2klstk.ru/wp-content/uploads/2024/09/filesz500-res-wizualizacje-zx114-zx114_view1_jpg.jpg"
          />
        </div>
      </div>
      <ul class="adv__adv_list">
        <li class="adv__adv_item">
          <div class="adv__adv_title">
            Долговечность свыше 100 лет и сейсмостойкость до 9 баллов
          </div>
          <div class="adv__adv_descr">
            обеспечат капитальный свайно-ростверковый фундамент и монолитная
            сталебетонная стена
          </div>
        </li>
        <li class="adv__adv_item">
          <div class="adv__adv_title">
            Экономия на отоплении и комфортный микроклимат
          </div>
          <div class="adv__adv_descr">
            благодаря высокой энергоэффективности строения, заполненного
            теплоизолирующего и шумоизолирующего материала полистиролбетона
          </div>
        </li>
        <li class="adv__adv_item">
          <div class="adv__adv_title">Безопасность</div>
          <div class="adv__adv_descr">
            все материалы, использующиеся для строительства каркасно-монолитных
            домов, имеют высокий уровень пожарной и экологической безопасности
          </div>
        </li>
        <li class="adv__adv_item">
          <div class="adv__adv_title">Внешний вид на любой вкус</div>
          <div class="adv__adv_descr">
            от суперсовременного навесного фасада до классической кирпичной
            кладки с возможностью полного обновления фасада в процессе
            эксплуатации
          </div>
        </li>
        <li class="adv__adv_item">
          <div class="adv__adv_title">Срок строительства дома</div>
          <div class="adv__adv_descr">
            от 60 дней – это инновационный подход к возведению жилья, который
            сочетает в себе современные технологии и стандартные строительные
            процедуры. Сокращает время без ущерба для качества.
          </div>
        </li>
        <li class="adv__adv_item">
          <div class="adv__adv_title">
            Экономия времени и денег на ремонт и отделку
          </div>
          <div class="adv__adv_descr">
            безусадочная технология позволит приступить к отделке сразу же после
            возведения коробки дома, технология обеспечит идеально ровные углы и
            поверхности, готовую предчистовую отделку
          </div>
        </li>
      </ul>
    </div>
  </section>
  <Projects />
  <section class="section imagine">
    <div class="section_in imagine__in">
      <h2 class="imagine__title">
        <strong>Представьте, как уже завтра</strong> <br />
        вы просыпаетесь в доме вашей мечты
      </h2>
      <ul class="imagine__list">
        <li class="imagine__item">
          <div class="imagine__img_w">
            <img class="imagine__img" src="@/assets/images/imagine/0.jpg" />
          </div>
          <div class="imagine__info">
            <div class="imagine__item_title">
              Проводите время с семьей и встречайте друзей
            </div>
            <div class="imagine__item_descr">
              Жарьте шашлыки и барбекю, гуляйте босиком по зеленой траве,
              читайте у камина, играйте в бильярд!
            </div>
          </div>
        </li>
        <li class="imagine__item">
          <div class="imagine__img_w">
            <img class="imagine__img" src="@/assets/images/imagine/1.jpg" />
          </div>
          <div class="imagine__info">
            <div class="imagine__item_title">
              Занимайтесь спортом на свежем воздухе
            </div>
            <div class="imagine__item_descr">
              Тренируйтесь в собственном зале, плавайте в бассейне, бегайте на
              свежем воздухе и встречайте рассветы!
            </div>
          </div>
        </li>
        <li class="imagine__item">
          <div class="imagine__img_w">
            <img class="imagine__img" src="@/assets/images/imagine/2.jpg" />
          </div>
          <div class="imagine__info">
            <div class="imagine__item_title">
              Дарите детям здоровое и счастливое детство
            </div>
            <div class="imagine__item_descr">
              У каждого ребенка будет своя комната, постройте детскую площадку с
              игровым комплексом, создайте игровую комнату!
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <SystemsSlider
    :systems="home?.acf.case_list"
    :title="home?.acf?.case_title"
  />
  <section class="section step js-step-slider-w">
    <div class="section_in step__in">
      <h2 class="step__title">
        Чтобы быть спокойным и уверенным в качественном доме -<strong
          >вам нужен надежный подрядчик</strong
        >
      </h2>
      <!-- <div class="step__subtitle">
        Обсуждается индивидуально, в зависимости от задач и их сложности
      </div> -->
      <div class="step__list_w">
        <Swiper
          :slides-per-view="4"
          :modules="[Navigation, Pagination]"
          :space-between="40"
          :speed="700"
          class="step__list"
          :navigation="{
            prevEl: '.js-step-navigation-prev',
            nextEl: '.js-step-navigation-next',
          }"
          :pagination="{ el: '.sys_slider__pag', clickable: true }"
          :breakpoints="{
            1200: { slidesPerView: 4, spaceBetween: 40 },
            992: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            320: { slidesPerView: 1.2, spaceBetween: 10 },
          }"
        >
          <SwiperSlide
            v-for="(item, i) in steps"
            :key="'works-item-slide-' + item.id"
          >
            <li class="step__card">
              <div class="step__card_info">
                <div class="step__card_title">{{ item.title }}</div>
                <div class="step__card_descr">{{ item.txt }}</div>
              </div>
            </li>
          </SwiperSlide>
        </Swiper>
        <div class="sys_slider__nav sys_slider__nav--step js-step-slider-nav">
          <button
            class="sys_slider__navigation sys_slider__navigation--prev_mod js-step-navigation-prev"
            type="button"
            aria-label="Prev slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
          <button
            class="sys_slider__navigation sys_slider__navigation--next_mod js-step-navigation-next"
            type="button"
            aria-label="Next slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="section stage js-sys-slider-w">
    <div class="section_in stage__in">
      <h2 class="stage__title">
        <strong>Посмотрите 4 этапа,</strong> как будет строиться ваш идеальный
        дом
      </h2>
      <div class="sys_slider__pag js-sys-pag-w"></div>
      <div class="stage__slider_w">
        <div class="stage__slider js-sys-slider">
          <Swiper
            :slides-per-view="1"
            :modules="[Navigation, Pagination]"
            :space-between="40"
            :speed="700"
            :navigation="{
              prevEl: '.js-bigstep-navigation-prev',
              nextEl: '.js-bigstep-navigation-next',
            }"
          >
            <SwiperSlide v-for="item in home?.acf.steps_list">
              <div class="stage__slide">
                <div class="stage__row">
                  <div class="stage__col stage__col--info">
                    <div class="stage__info">
                      <div class="stage__info_title">
                        {{ item.title }}
                      </div>
                      <div class="stage__info_subtitle">Включено:</div>
                      <ul class="stage__info_list">
                        <li
                          class="stage__info_item"
                          v-for="subitem in item.list"
                        >
                          <span class="stage__info_item_icon">
                            <svg class="icon icon_checked icon--size_mod">
                              <use
                                xlink:href="@/assets/images/sprite/sprite.svg#checked"
                              ></use></svg></span
                          ><span>{{ subitem.title }}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="stage__info_about">
                      <div class="stage__info_about_item">
                        <span class="stage__info_about_item_icon">
                          <svg class="icon icon_clock icon--size_mod">
                            <use
                              xlink:href="@/assets/images/sprite/sprite.svg#clock"
                            ></use></svg></span
                        ><span>Срок: </span><strong> {{ item.dedline }}</strong>
                      </div>
                      <div class="stage__info_about_item">
                        <span class="stage__info_about_item_icon">
                          <svg class="icon icon_rub icon--size_mod">
                            <use
                              xlink:href="@/assets/images/sprite/sprite.svg#rub"
                            ></use></svg></span
                        ><span>Стоимость: </span
                        ><strong> {{ item.price }}</strong>
                      </div>
                    </div>
                  </div>
                  <div class="stage__col stage__col--img">
                    <div class="stage__img_w">
                      <img class="stage__img" :src="item.img" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="sys_slider__nav sys_slider__nav--step js-sys-nav-w">
          <button
            class="sys_slider__navigation sys_slider__navigation--prev_mod js-bigstep-navigation-prev"
            type="button"
            aria-label="Prev slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
          <button
            class="sys_slider__navigation sys_slider__navigation--next_mod js-bigstep-navigation-next"
            type="button"
            aria-label="Next slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- <section class="section about_us">
    <div class="section_in about_us__in">
      <h2 class="about_us__title">
        Чтобы быть спокойным и уверенным в качественном доме -<strong
          >вам нужен надежный подрядчик</strong
        >
      </h2>
      <div class="about_us__row">
        <div class="about_us__col about_us__col--info">
          <h3 class="about_us__col_title">Чем мы занимаемся?</h3>
          <ul class="about_us__list">
            <li class="about_us__item">
              <span class="about_us__item_icon">
                <svg class="icon icon_about-0 icon--size_mod">
                  <use
                    xlink:href="@/assets/images/sprite/sprite.svg#about-0"
                  ></use></svg></span
              ><span class="about_us__item_title"
                >Строительство домов по технологии «МСБК» срок строительства: от
                60 дней</span
              >
            </li>
            <li class="about_us__item">
              <span class="about_us__item_icon">
                <svg class="icon icon_about-1 icon--size_mod">
                  <use
                    xlink:href="@/assets/images/sprite/sprite.svg#about-1"
                  ></use></svg></span
              ><span class="about_us__item_title"
                >Проектирование дома строим по выбранному проекту</span
              >
            </li>
            <li class="about_us__item">
              <span class="about_us__item_icon">
                <svg class="icon icon_about-2 icon--size_mod">
                  <use
                    xlink:href="@/assets/images/sprite/sprite.svg#about-2"
                  ></use></svg></span
              ><span class="about_us__item_title"
                >Отделка домов «Под ключ»</span
              >
            </li>
          </ul>
        </div>
        <div class="about_us__col about_us__col--img">
          <div class="about_us__col_heading">
            <h3 class="about_us__col_title">Мы есть на</h3>
            <div class="about_us__logo_img_w">
              <img
                class="about_us__logo_img"
                src="@/assets/images/about-us/logo.png"
                alt="some image"
                loading="lazy"
              />
            </div>
          </div>
          <div class="about__img_box">
            <div class="about__img_w">
              <img
                class="about__img"
                src="@/assets/images/about-us/about.jpg"
                alt="some image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> -->

  <section class="section excursion">
    <div class="section_in excursion__in">
      <div class="excursion__row">
        <div class="excursion__col excursion__col--info">
          <div class="excursion__info_in">
            <h2 class="excursion__title">
              Приглашаем на <strong>бесплатную экскурсию</strong> по строящимся
              объектам
            </h2>
            <div class="excursion__subtitle">
              Поговорите с нашими строителями, узнайте больше о процессе
            </div>
            <ul class="excursion__list">
              <li class="excursion__item">
                <strong>Исследуйте</strong> используемые технологии
                строительства
              </li>
              <li class="excursion__item">
                <strong>Оцените</strong> качество стройматериалов
              </li>
              <li class="excursion__item">
                <strong>Задайте</strong> вопросы нашему прорабу
              </li>
            </ul>
            <ExcursionForm />
          </div>
        </div>
        <div class="excursion__col excursion__col--img">
          <div class="excursion__img_w">
            <img
              class="excursion__img"
              src="https://2klstk.ru/wp-content/uploads/2024/09/a40026533b53cfc61db1f98d9f031307.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section step js-step-slider-w">
    <div class="section_in step__in">
      <h2 class="step__title">
        Чтобы быть спокойным и уверенным в качественном доме -<strong
          >вам нужен надежный подрядчик</strong
        >
      </h2>
      <div class="step__subtitle">
        Как и у любой компании у нас есть как положительные, так и отрицательные
        отзывы. Мы ничего от вас не скрываем
      </div>
      <div class="step__list js-step-slider js-step-slider--review">
        <Swiper
          :slides-per-view="3"
          :modules="[Navigation, Pagination]"
          :space-between="40"
          :speed="700"
          :breakpoints="{
            1200: { slidesPerView: 3, spaceBetween: 40 },
            992: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            320: { slidesPerView: 1.2, spaceBetween: 10 },
          }"
          :navigation="{
            prevEl: '.js-review-navigation-prev',
            nextEl: '.js-review-navigation-next',
          }"
        >
          <SwiperSlide
            v-for="(item, i) in home?.acf.rev"
            :key="'reviews-home-' + i"
          >
            <li class="step__card">
              <div class="step__rev_info">
                <div class="step__rev_heading">
                  <div class="step__rev_img_w">
                    <img class="step__rev_img" :src="item.img" />
                  </div>
                  <div class="step__rev_about">
                    <div class="step__rev_name">
                      {{ item.name }}
                    </div>
                    <div class="step__rev_date">{{ item.date }}</div>
                  </div>
                  <div class="step__rev_icon_img_w">
                    <img class="step__rev_icon_img" :src="item.resurs" />
                  </div>
                </div>
                <div class="step__rev_descr">
                  {{ item.txt }}
                </div>
                <a
                  class="step__rev_link"
                  :href="item.link.url"
                  target="_blank"
                  >{{ item.link.title }}</a
                >
              </div>
            </li>
          </SwiperSlide>
        </Swiper>

        <div class="sys_slider__nav sys_slider__nav--step js-step-slider-nav">
          <button
            class="sys_slider__navigation sys_slider__navigation--prev_mod js-review-navigation-prev"
            type="button"
            aria-label="Prev slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
          <button
            class="sys_slider__navigation sys_slider__navigation--next_mod js-review-navigation-next"
            type="button"
            aria-label="Next slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="section step js-step-slider-w step--stage-mod">
    <div class="section_in step__in">
      <h2 class="step__title">
        Чтобы быть спокойным и уверенным в качественном доме -<strong
          >вам нужен надежный подрядчик</strong
        >
      </h2>
      <div class="step__subtitle">
        Обсуждается индивидуально, в зависимости от задач и их сложности
      </div>
      <div class="step__list_w">
        <Swiper
          :slides-per-view="3"
          :modules="[Navigation, Pagination]"
          :space-between="40"
          :speed="700"
          :breakpoints="{
            1200: { slidesPerView: 4, spaceBetween: 40 },
            992: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            320: { slidesPerView: 1, spaceBetween: 10 },
          }"
          :navigation="{
            prevEl: '.js-builder-navigation-prev',
            nextEl: '.js-builder-navigation-next',
          }"
        >
          <SwiperSlide>
            <li class="step__card">
              <div class="step__card_info">
                <div class="step__card_title">Помощь в подборе участка</div>
              </div>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li class="step__card">
              <div class="step__card_info">
                <div class="step__card_title">
                  Получение разрешения на строительство
                </div>
              </div>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li class="step__card">
              <div class="step__card_info">
                <div class="step__card_title">
                  Помощь с подключением внешних коммуникаций
                </div>
              </div>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li class="step__card">
              <div class="step__card_info">
                <div class="step__card_title">
                  Сдача объекта строительства в эксплуатацию
                </div>
              </div>
            </li>
          </SwiperSlide>
        </Swiper>
        <div class="sys_slider__nav sys_slider__nav--step js-step-slider-nav">
          <button
            class="sys_slider__navigation sys_slider__navigation--prev_mod js-builder-navigation-prev"
            type="button"
            aria-label="Prev slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
          <button
            class="sys_slider__navigation sys_slider__navigation--next_mod js-builder-navigation-next"
            type="button"
            aria-label="Next slide"
          >
            <svg class="icon icon_slider-arr icon--size_mod">
              <use
                xlink:href="@/assets/images/sprite/sprite.svg#slider-arr"
              ></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="section contact">
    <div class="section_in contact__in">
      <div class="contact__row">
        <div class="contact__col contact__col--map">
          <h2 class="contact__title">Мы на карте</h2>
          <div class="contact__row_icon">
            <span class="contact__icon">
              <svg class="icon icon_marker icon--size_mod">
                <use
                  xlink:href="@/assets/images/sprite/sprite.svg#marker"
                ></use></svg></span
            ><span>г. Краснодар, ул.Соколова, д. 66/2, офис 1</span>
          </div>
          <div class="contact__map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4da2c5bba387fa2568380d887aae1c794786c9dac056a25f477cf46cd181a543&amp;source=constructor"
              width="100%"
              height="400"
              frameborder="0"
            ></iframe>
          </div>
        </div>
        <div class="contact__col contact__col--info">
          <h2 class="contact__title">Наши контакты</h2>
          <div class="contact__day">Без выходных 9:00-18:00</div>
          <a class="contact__phone" href="tel:+79282755456">+7 928 275 54 56</a>
          <div class="contact__btn_w">
            <a class="btn_base_s contact__contact" @click="openModal('form')"
              >Заказать звонок</a
            >
          </div>
          <h3 class="contact__subtitle">Отвечаем мгновенно</h3>
          <ul class="contact__social_list">
            <li class="contact__social_item">
              <a class="contact__social_link" href="https://t.me/masternavse2"
                ><img src="@/assets/images/contact/telegram.svg"
              /></a>
            </li>
            <li class="contact__social_item">
              <a class="contact__social_link" href="https://wtsp.cc/79282755456"
                ><img src="@/assets/images/contact/whatsapp.svg"
              /></a>
            </li>
          </ul>
          <div class="contact__row_icon contact__row_icon--wheight">
            <span class="contact__icon">
              <Icons icon="clarity:envelope-solid" :size="30" /> </span
            ><a href="mailto:komfort@gmail.com">komfort@gmail.com</a>
          </div>
        </div>
        <div class="contact__col contact__col--img">
          <div class="contact__img_w">
            <img
              class="contact__img"
              src="https://2klstk.ru/wp-content/uploads/2024/09/px7dirxpmww1up4pve20j9ksa5so17h4.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuizForm from "@/components/QuizForm.vue";
import Projects from "@/components/home/Projects.vue";
import SystemsSlider from "@/components/home/SystemsSlider.vue";
import ExcursionForm from "@/components/ExcursionForm.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useHomeStore, useHomeStoreRefs } from "@/stores/useHomeStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
gsap.registerPlugin(ScrollTrigger);

const { getHome } = useHomeStore();
const { home } = useHomeStoreRefs();
const { openModal } = useModalStore();
const steps = ref<any>([
  {
    title: "Дом за 3 месяца",
    txt: "Ваш дом будет готов без необходимости в доработках и покраске",
  },
  {
    title: "Поэтапная оплата",
    txt: "Платите только после проверки завершенного этапа",
  },
  {
    title: "Штатные проектировщики",
    txt: "Работаем с нуля или дорабатываем проект по вашему выбору",
  },
  {
    title: "Лучшие цены за материалы",
    txt: "Закупаем материалы напрямую у поставщиков",
  },
]);

onMounted(async () => {
  await getHome();

  // Анимация при скролле для всех секций с классом '.section'
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 100,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%", // Запуск анимации, когда секция видна на 80%
        toggleActions: "play none none reverse", // Настройка повторной анимации
      },
    });
  });
});
</script>

<style scoped lang="scss">
.swiper-button-disabled {
  opacity: 0;
}
</style>
