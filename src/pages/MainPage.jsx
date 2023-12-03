import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getParkingsThunk } from '../components/getParkingsThunk';

export function MainPage() {

  // const dispatch = useDispatch();

  return (
    <div
      style={{ 
        backgroundImage: 'url("/img/img_1.png")', 
        backgroundSize: 'cover',
        minHeight: '80%'
      }}
      // style={{ backgroundImage: 'url("../../")' }}

    >
      {/* <h2>MainPage</h2> */}
      <p>В цьому додатку на даний момент доступні наступні функції:</p>
      <p>Переглянути адреси всіх парковок в нашому місті</p>
      <p>Переглянути всі парковки на карті</p>
      <p>Добавити зручні Вам парковки в обрані для швидкого доступу</p>
      <p>В лівому верхньому кутку є поле пошуку, де можна за адресою чи назвою знайти потрібне місце на карті</p>
      <p>По кліку на кожен маркер парковки на карті відкриваються дані про адресу, час роботи, вартість, вільні місця та можливість забронювати місце на найближчій час</p>
      <p>За допомогою кліку по карті можна позначити своє місцезнаходження та побудувати маршрут до вибраної парковки</p>

    </div>
  )
}
