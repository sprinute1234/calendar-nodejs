{
  moment.locales()
  const vm = new Vue({
    el: '#calendar-vue',
    data: {
      title: "Calendar",
      date : moment(),
    },
    computed: {
      year: function () {
        // année
        return this.date.get('year')
      },
      month: function () {
        // numéro du mois
        return this.date.get('month')
      },
      nameMonth: function () {
        // nom du mois
        return this.date.startOf("month").format('MMMM')
      },
      weekdays: function () {
        // recupération des jours de la semaine
        return moment.weekdays()
      },
      days: function () {
        // recupération des jours dispo dans le mois
        return this.date.daysInMonth()
      },
    },
    methods: {
      // changement de mois precedent
      //handleClick: function() {}
      prevMonth() {
        console.log(this.date.get('month') - 1)
        this.date = this.date.subtract(1, 'month')
        // this.date = moment().set('month', this.date.get('month') - 1)
      },
      // changement de mois suivant
      nextMonth() {
        console.log(this.date.get('month') + 1)
        this.date = this.date.add(1, 'month')
        // this.date = moment().set('month', this.date.get('month') + 1)
      },
    }
  })
}
{
  const el = document.querySelector('#calendar')

  var local = moment().local()

  const month = moment().get('month')
  const year = moment().get('year')
  const nameMonth = moment().subtract(1,"month").startOf("month").format('MMMM');
  const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  const numDays = moment().daysInMonth()
  const startDate = moment()
  const days = []
  const dateAt = (date, i) =>
    moment(
      moment(startDate).set('date',
        numDays + i
      )
    )

  for (let i = 0; i < numDays; i++) {
    days.push(dateAt(startDate, i))
  }


  el.innerHTML = `
    <h1>Calendar</h1>

    <div class="month" id="month">
      <ul>
        <li class="prev">&#10094;</li>
        <li class="next">&#10095;</li>
        <li>
          ${nameMonth}<br>
          <span style="font-size:18px">${year}</span>
        </li>
      </ul>
    </div>

    <ul class="weekdays" id="weekdays">
      ${
        weekdays.map(weekday => `
            <li class="weekday">${weekday}</li>
          `).join('')
      }
    </ul>

    <ul class="days" id="days">
      ${
        days.map(day => `
          <li class="day">${day}</li>
        `).join('')
      }
    </ul>
  `
}
