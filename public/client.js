{
  moment.locales()
  const vm = new Vue({
    el: '#calendar-vue',
    data: {
      title: "Calendar",
      date : moment(),
      selectedDay: '',
      loading: false,
      evenement : [],
      formEvent: {
        text:'',
      },
    },
    created: function () {
      this.loading = true

      loadEvents()
        .then(events => {
          this.evenement = events
        })
        .catch(err => {
          alert("non")
        })
        .then(() => {
          this.loading = false
        })
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
      firstDay: function () {
        // quel jour commence le 1er du mois
        const startOfMonth = this.date.startOf('month')
        const firstDay = startOfMonth.get('day')
        return firstDay
      },
      numDay: function () {
        return this.selectedDay
      },
      events: function () {
        return this.evenement
      }
    },
    methods: {
      // changement de mois precedent
      //handleClick: function() {}
      prevMonth() {
        const date = moment(this.date)
        date.subtract(1, 'month')
        this.date = date
      },
      // changement de mois suivant
      nextMonth() {
        const date = moment(this.date)
        date.add(1, 'month')
        this.date = date
      },
      // selection d'une date
      selectDay(day) {
        this.selectedDay = day.target.innerText
      },
      addEvent(e) {
        e.preventDefault()
        const index = this.evenement.length
        var date = this.date

        const data = this.formEvent
        add(data)
          .then( (evenement) => {
            this.evenement = [...this.evenement, evenement]
          })
          .catch(err => alert('no'))
      },
      deleteEvent(events) {
        deletEvents(events)
          .then( (evenement) => {
            const id = evenement.id
            const index = this.evenement.findIndex(it => it.id === id)
            const newEvenement = Array.from(this.evenement)
            newEvenement.splice(index,1)
            this.evenement = newEvenement
          })
          .catch(err => console.error('delete error'))
      }
    }
  })

  function loadEvents() {
    return fetch('/api/calendar')
      .then(response => response.json());
  }

  function add(data) {
    return fetch('/api/calendar', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
  function deletEvents(data) {
    return fetch('/api/calendar', {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data),
    })
  }
}
{
  // const el = document.querySelector('#calendar')
  //
  // var local = moment().local()
  //
  // const month = moment().get('month')
  // const year = moment().get('year')
  // const nameMonth = moment().subtract(1,"month").startOf("month").format('MMMM');
  // const weekdays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
  // const numDays = moment().daysInMonth()
  // const startDate = moment()
  // const days = []
  // const dateAt = (date, i) =>
  //   moment(
  //     moment(startDate).set('date',
  //       numDays + i
  //     )
  //   )
  //
  // for (let i = 0; i < numDays; i++) {
  //   days.push(dateAt(startDate, i))
  // }
  //
  //
  // el.innerHTML = `
  //   <h1>Calendar</h1>
  //
  //   <div class="month" id="month">
  //     <ul>
  //       <li class="prev">&#10094;</li>
  //       <li class="next">&#10095;</li>
  //       <li>
  //         ${nameMonth}<br>
  //         <span style="font-size:18px">${year}</span>
  //       </li>
  //     </ul>
  //   </div>
  //
  //   <ul class="weekdays" id="weekdays">
  //     ${
  //       weekdays.map(weekday => `
  //           <li class="weekday">${weekday}</li>
  //         `).join('')
  //     }
  //   </ul>
  //
  //   <ul class="days" id="days">
  //     ${
  //       days.map(day => `
  //         <li class="day">${day}</li>
  //       `).join('')
  //     }
  //   </ul>
  // `
}
