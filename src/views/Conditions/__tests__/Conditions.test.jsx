/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Conditions from '../Conditions';

const store = {
  headerVisibility: false,
  info: {
    1: {
      loading: 'succeeded',
      error: null,
      data: {
        id: 1,
        title: 'Про платформу',
        text:
          '<p>Доказові — платформа з перевіреною і надійною інформацією про COVID-19, вакцинацію та інші важливі теми, пов’язані з медициною.</p><p>На платформі публікуються авторські матеріали лікарів та експертів, інформація від ЮНІСЕФ, а також переклади міжнародних матеріалів та науково-популярних статей.</p><p>Автори платформи Доказові — це люди, які постійно навчаються, використовують дані з наукових джерел і належать до авторитетних медичних спільнот. Вони постійно підвищують рівень знань, щоб ефективно лікувати, розповідати і пояснювати.</p><p>Принципи, за якими працює платформа Доказові:</p><ul><li>доказова медицина: на порталі оприлюднюються матеріали, які відповідають принципу доказової медицини</li><li>відбір інформації експертами: всю інформацію для порталу відбирають, готують і верифікують авторитетні й надійні лікарі, експерти, фактчекери</li><li>міжнародні рекомендації: відомості, подані на порталі, відповідають рекомендаціям ВООЗ, Центрів контролю за захворюваннями США і сайту системи охорони здоров’я Великобританії</li><li>інформація, якою варто дилітись: закликаємо поширювати інформацію, оприлюднену на платформі, а також використовувати її з освітніми цілями (докладніше — у <a href="http://localhost:3000/conditions/rules" rel="noopener noreferrer" target="_blank">Правилах користування</a>)</li></ul><p>Матеріали сайту будуть корисними сімейним лікарям та медикам вузьких спеціальностей, науковцям, які працюють з темами COVID-19 і вакцинації, журналістам, які пишуть про них, батькам та всім, хто хоче знати більше на теми, про які пише платформа Доказові.</p><p>Платформу розробили та запустили у 2021 році Дитячий фонд ООН (ЮНІСЕФ) в Україні та SoftServe за підтримки Агентства США з міжнародного розвитку (USAID).</p>',
      },
    },
    2: {
      loading: 'succeeded',
      error: null,
      data: {
        id: 2,
        title: 'Правила використання',
        text:
          '<p>Платформа Доказові заохочує використовувати, публікувати і розповсюджувати оприлюднені на ній матеріали. Водночас використання матеріалів можливе за умов, викладених у цих правилах.</p><p>Матеріали, оприлюднені на платформі Доказові, створені для цієї платформи, якщо в самій публікації не вказано інше джерело (наприклад, що це допис експерта у соцмережах або відео організації).</p><p>Матеріали платформи дозволено використовувати:</p><p>в інших медіа –лише за умови посилання на платформу Доказові:</p><ul><li>для діджитал-медіа – гіперпосилання на dokazovi.info не нижче першого абзацу</li><li>для телебачення і радіо – згадка в синхроні сюжету/передачі</li><li>для особистих цілей: ви можете завантажити або скопіювати вміст сайту, інші компоненти та елементи, що відображаються на сайті</li><li>для освітнього процесу: як джерела для матеріалів занять, завдання тощо</li></ul><p>Під час використання матеріалів у будь-якому випадку не можна змінювати текст і візуальні матеріали, щоб запобігти тому, що сенс матеріалів може бути розтлумачено невірно, виділено з контексту або викривлено.</p><p>В будь-якому випадку під час використання матеріалів необхідно завжди вказувати його автора/авторів.</p><p>Використовувати матеріали платформи з метою отримання комерційної вигоди заборонено.</p><p><br></p><p>Переклади матеріалів видань ____, ____, _____ здійснено на умовах ексклюзивної угоди між ЮНІСЕФ в Україні та цими виданнями. УМОВИ ПЕРЕДРУКУ ЦИХ МАТЕРІАЛІВ.</p><p><em>Тут ще буде доповнення по тексту, поки за оцінками – до 1000 символів.</em></p>',
      },
    },
    3: {
      loading: 'succeeded',
      error: null,
      data: {
        id: 3,
        title: 'Контакти',
        text:
          '<p>Хочете стати автором платформи?</p><p>Бажаєте співпрацювати?</p><p>Маєте запитання?</p><p>Пишіть нам на contact@dokazovi.info</p>',
      },
    },
    isFetchedAll: true,
  },
};

jest.mock('react-redux', () => ({
  useSelector: (cb) => {
    return cb(store);
  },
  useDispatch: () => jest.fn(),
}));

describe('Conditions component tests', () => {
  it('should render Conditions component', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Conditions />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render main blocks', () => {
    render(
      <MemoryRouter>
        <Conditions />
      </MemoryRouter>,
    );

    expect(screen.getAllByText('Про платформу')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Правила використання')[1]).toBeInTheDocument();
    expect(screen.getAllByText('Контакти')[1]).toBeInTheDocument();
  });
});