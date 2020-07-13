<!--
  NOTE: You will need to install tiptap-vuetify, dompurify, and rrule to use this component.
  A great calendar application to build into your website.  This calendar component allows you to create a calendar with events using the v-calendar component.  It also can create recurring events using the RRule library.  However, once you create events, you cannot modify their recurrence.  On your client site, you will need to use the v-calendar component or similar to accept your array of events.  WARNING: Recurring events generate a new event for each date.  Using this feature too much could lead to high Firestore costs!
-->
<template>
  <div class="calendar-comp">
    <v-card>
      <v-card-title>
        <h2>Troop 471 Master Events Calendar</h2>
      </v-card-title>
      <v-card-text align="center">
        <v-row>
          <v-col cols="12" md="6">
            <v-card outlined>
              <v-card-text align="center">
                <v-sheet height="64">
                  <v-toolbar flat>
                    <v-btn class="mr-4" outlined @click="setToday">Today</v-btn>
                    <v-btn fab small text @click="prev">
                      <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab small text @click="next">
                      <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                      {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer />
                    <v-menu bottom offset-y right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-bind="attrs" v-on="on">
                          <span>{{ typeToLabel[type] }}</span>
                          <v-icon right>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="type = 'day'">
                          <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                          <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                          <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                          <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
                <v-sheet height="500">
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="blue"
                    :type="type"
                    :events="retVal.events"
                    :event-color="getEventColor"
                    :event-text-color="getTextColor"
                    @click:date="viewDay"
                    @click:more="viewDay"
                    @click:event="showEvent"
                  />
                  <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    min-width="300px"
                    max-width="400px"
                    offset-y
                  >
                    <v-card
                      min-width="300px"
                      width="90vh"
                      max-width="400px"
                      flat
                    >
                      <v-toolbar :color="selectedEvent.color" flat>
                        <v-toolbar-title>{{
                          selectedEvent.name
                        }}</v-toolbar-title>
                        <v-spacer />
                        <v-btn icon @click="edit">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click="remove">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <strong v-if="!selectedEvent.allDay">
                          When:
                          {{ new Date(selectedEvent.start).toLocaleString() }} -
                          {{ new Date(selectedEvent.end).toLocaleString() }}
                        </strong>
                        <strong v-else>
                          When:
                          {{
                            new Date(
                              `${selectedEvent.start}T00:00:00`
                            ).toLocaleDateString()
                          }}
                          -
                          {{
                            new Date(
                              `${selectedEvent.end}T00:00:00`
                            ).toLocaleDateString()
                          }}
                        </strong>
                        <v-spacer />
                        <strong
                          v-if="selectedEvent.location"
                          v-html="
                            sanitized(
                              `<span>Where: ${selectedEvent.location}</span>`
                            )
                          "
                        />
                        <v-spacer />
                        <span
                          v-if="selectedEvent.details"
                          v-html="
                            sanitized(
                              `<span>Details: ${selectedEvent.details}</span>`
                            )
                          "
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          :color="selectedEvent.color"
                          @click="selectedOpen = false"
                        >
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-sheet>
              </v-card-text>
              <v-card-actions>
                <v-btn class="mr-2 white--text" color="red" @click="clear"
                  >Delete Old Events</v-btn
                >
                <span
                  >This will delete any event before the current month.</span
                >
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined>
              <v-card-title>Add and Modify Events</v-card-title>
              <v-card-text align="left">
                <v-form ref="form" @submit.prevent>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                        v-model="color"
                        :items="colors"
                        label="Color"
                        filled
                        :rules="[rules.required]"
                      />
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="title"
                        filled
                        label="Event Name"
                        :counter="50"
                        :rules="[rules.required, rules.max]"
                      />
                    </v-col>
                  </v-row>
                  <v-switch v-model="allDay" color="blue" label="All Day" />
                  <v-text-field
                    v-model="start"
                    filled
                    :label="allDay ? 'Start Date' : 'Start Date and Time'"
                    :type="allDay ? 'date' : 'datetime-local'"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    v-model="end"
                    filled
                    :label="allDay ? 'End Date' : 'End Date and Time'"
                    :type="allDay ? 'date' : 'datetime-local'"
                    :rules="[rules.required]"
                  />
                  <v-switch
                    v-model="repeat"
                    color="blue"
                    label="Repeating Event"
                    :disabled="editing"
                    :hint="
                      editing
                        ? 'You cannot change the recurrence of events after they are scheduled.'
                        : ''
                    "
                    :persistent-hint="editing"
                  />
                  <v-spacer style="height: 20px" />
                  <div v-if="repeat">
                    <p>
                      3 repeat modes are available. You can only use one mode.
                      You will not be able to modify the event recurrence after
                      you add the event.
                    </p>
                    <p v-if="mode === 1 || mode === 0">
                      Repeat Every
                      <v-text-field
                        v-model.number="oft"
                        filled
                        type="number"
                        label="Interval"
                        :rules="[rules.required, rules.min]"
                      />
                      <v-select
                        v-model="amt"
                        filled
                        :items="['Days', 'Weeks', 'Months', 'Years']"
                        label="Frequency"
                        clearable
                        :rules="[rules.required]"
                      />
                    </p>
                    <p v-if="mode === 2 || mode === 0">
                      Repeat on the
                      <v-select
                        v-model="wk"
                        filled
                        :items="[
                          {
                            text: '1st',
                            value: 1
                          },
                          {
                            text: '2nd',
                            value: 2
                          },
                          {
                            text: '3rd',
                            value: 3
                          },
                          {
                            text: '4th',
                            value: 4
                          },
                          {
                            text: '5th',
                            value: 5
                          }
                        ]"
                        label="Week Number"
                        clearable
                        :rules="[rules.required]"
                      />
                      <v-select
                        v-model="dys"
                        filled
                        :items="days"
                        label="Select Day"
                        clearable
                        :rules="[rules.required]"
                      />
                      of each month.
                    </p>
                    <p v-if="mode === 3 || mode === 0">
                      Repeat on
                      <v-select
                        v-model="dys2"
                        filled
                        multiple
                        :items="days"
                        label="Select Days"
                        clearable
                        :rules="[rules.minLength]"
                      />
                      each week.
                    </p>
                    <p>
                      End repeat on
                      <v-text-field
                        v-model="endRpt"
                        filled
                        type="date"
                        label="End Repeat"
                        :rules="[rules.required]"
                      />
                    </p>
                  </div>
                  <tiptap-vuetify
                    v-model="location"
                    :extensions="extensions"
                    :card-props="{ outlined: true }"
                    placeholder="Event Location"
                    :toolbar-attributes="{
                      color: $vuetify.theme.dark ? '#2e2e2e' : '#f5f5f5'
                    }"
                  />
                  <v-spacer style="height: 20px" />
                  <tiptap-vuetify
                    v-model="desc"
                    :extensions="extensions"
                    :card-props="{ outlined: true }"
                    placeholder="Event Details"
                    :toolbar-attributes="{
                      color: $vuetify.theme.dark ? '#2e2e2e' : '#f5f5f5'
                    }"
                  />
                  <v-spacer style="height: 20px" />
                  <v-btn v-if="!editing" block @click="addEvent"
                    >Add Event</v-btn
                  >
                  <v-btn v-else block @click="modify">Update Event</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { sanitize } from 'dompurify';
import { RRule } from 'rrule';
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify';
export default {
  name: 'CalendarComponent',
  components: {
    TiptapVuetify
  },
  props: {
    name: {
      type: String,
      default: 'Calendar'
    },
    props: {
      type: Object,
      default() {
        return {
          events: []
        };
      }
    },
    value: {
      type: Object,
      default() {
        return {
          events: this.props.events
        };
      }
    }
  },
  data() {
    return {
      retVal: this.value,
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days'
      },
      colors: [
        { text: 'Auto', value: 'primary' },
        { text: 'Red', value: 'red' },
        { text: 'Pink', value: 'pink' },
        { text: 'Purple', value: 'purple' },
        { text: 'Deep Purple', value: 'deep-purple' },
        { text: 'Indigo', value: 'indigo' },
        { text: 'Blue', value: 'blue' },
        { text: 'Light Blue', value: 'light-blue' },
        { text: 'Cyan', value: 'cyan' },
        { text: 'Teal', value: 'teal' },
        { text: 'Green', value: 'green' },
        { text: 'Light Green', value: 'light-green' },
        { text: 'Orange', value: 'orange' },
        { text: 'Deep Orange', value: 'deep-orange' },
        { text: 'Brown', value: 'brown' },
        { text: 'Blue Gray', value: 'blue-grey' },
        { text: 'Gray', value: 'grey' }
      ],
      color: null,
      title: null,
      start: null,
      end: null,
      repeat: false,
      oft: null,
      amt: null,
      wk: null,
      dys: null,
      dys2: [],
      days: [
        {
          text: 'Sunday',
          value: RRule.SU
        },
        {
          text: 'Monday',
          value: RRule.MO
        },
        {
          text: 'Tuesday',
          value: RRule.TU
        },
        {
          text: 'Wednesday',
          value: RRule.WE
        },
        {
          text: 'Thursday',
          value: RRule.TH
        },
        {
          text: 'Friday',
          value: RRule.FR
        },
        {
          text: 'Saturday',
          value: RRule.SA
        }
      ],
      endRpt: '',
      location: null,
      desc: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      editing: false,
      item: null,
      allDay: false,
      rules: {
        required: value => !!value || 'Required.',
        max: value => (value && value.length <= 50) || 'Max 50 characters.',
        min: value => (value && value > 0) || 'Minimum value of 1.',
        minLength: value => (value && value.length > 0) || 'Required.'
      },
      extensions: [
        History,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3, 4]
            }
          }
        ],
        Paragraph,
        Bold,
        Italic,
        Underline,
        Strike,
        Link,
        OrderedList,
        BulletList,
        ListItem,
        Blockquote,
        Code,
        HorizontalRule,
        HardBreak
      ]
    };
  },
  computed: {
    safeLoc() {
      return sanitize(this.location);
    },
    safeDesc() {
      return sanitize(this.desc);
    },
    mode() {
      if (this.amt || this.oft) {
        return 1;
      } else if (this.dys || this.wk) {
        return 2;
      } else if (this.dys2.length > 0) {
        return 3;
      } else {
        return 0;
      }
    }
  },
  watch: {
    location() {
      this.location = this.safeLoc;
    },
    desc() {
      this.desc = this.safeDesc;
    }
  },
  created() {
    this.location = this.safeLoc;
    this.desc = this.safeDesc;
    this.$emit('input', this.retVal);
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    addEvent() {
      const event = {
        color: this.color,
        name: this.title,
        start: this.start,
        end: this.end,
        allDay: this.allDay,
        location: this.location,
        details: this.desc
      };
      const isValid = this.$refs.form.validate();
      if (isValid) {
        if (this.repeat) {
          let rule;
          let rend;
          const start = new Date(this.start);
          const end = new Date(this.end);
          const endRpt = new Date(this.endRpt);
          if (!this.allDay) {
            switch (this.amt) {
              case 'Days': {
                console.log('Days');
                rule = new RRule({
                  freq: RRule.DAILY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getDate(),
                      start.getHours(),
                      start.getMinutes(),
                      start.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.DAILY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getDate(),
                      end.getHours(),
                      end.getMinutes(),
                      end.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                break;
              }
              case 'Weeks': {
                console.log('Weeks');
                rule = new RRule({
                  freq: RRule.WEEKLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getDate(),
                      start.getHours(),
                      start.getMinutes(),
                      start.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.WEEKLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getDate(),
                      end.getHours(),
                      end.getMinutes(),
                      end.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                console.log(rule);
                break;
              }
              case 'Months': {
                console.log('Months');
                rule = new RRule({
                  freq: RRule.MONTHLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getDate(),
                      start.getHours(),
                      start.getMinutes(),
                      start.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.MONTHLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getDate(),
                      end.getHours(),
                      end.getMinutes(),
                      end.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                break;
              }
              case 'Years': {
                console.log('Years');
                rule = new RRule({
                  freq: RRule.YEARLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getDate(),
                      start.getHours(),
                      start.getMinutes(),
                      start.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.YEARLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getDate(),
                      end.getHours(),
                      end.getMinutes(),
                      end.getSeconds()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getDate()
                    )
                  )
                });
                console.log(rule);
                break;
              }
              default: {
                if (this.mode === 2) {
                  rule = new RRule({
                    freq: RRule.MONTHLY,
                    byweekday: [this.dys.nth(this.wk)],
                    dtstart: new Date(
                      Date.UTC(
                        start.getFullYear(),
                        start.getMonth(),
                        start.getDate(),
                        start.getHours(),
                        start.getMinutes(),
                        start.getSeconds()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getDate()
                      )
                    )
                  });

                  rend = new RRule({
                    freq: RRule.MONTHLY,
                    byweekday: [this.dys.nth(this.wk)],
                    dtstart: new Date(
                      Date.UTC(
                        end.getFullYear(),
                        end.getMonth(),
                        end.getDate(),
                        end.getHours(),
                        end.getMinutes(),
                        end.getSeconds()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getDate()
                      )
                    )
                  });
                } else if (this.mode === 3) {
                  rule = new RRule({
                    freq: RRule.WEEKLY,
                    byweekday: this.dys2,
                    dtstart: new Date(
                      Date.UTC(
                        start.getFullYear(),
                        start.getMonth(),
                        start.getDate(),
                        start.getHours(),
                        start.getMinutes(),
                        start.getSeconds()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getDate()
                      )
                    )
                  });

                  rend = new RRule({
                    freq: RRule.WEEKLY,
                    byweekday: this.dys2,
                    dtstart: new Date(
                      Date.UTC(
                        end.getFullYear(),
                        end.getMonth(),
                        end.getDate(),
                        end.getHours(),
                        end.getMinutes(),
                        end.getSeconds()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getDate()
                      )
                    )
                  });
                }
              }
            }
          } else {
            switch (this.amt) {
              case 'Days': {
                console.log('Days');
                rule = new RRule({
                  freq: RRule.DAILY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.DAILY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                break;
              }
              case 'Weeks': {
                console.log('Weeks');
                rule = new RRule({
                  freq: RRule.WEEKLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.WEEKLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                console.log(rule);
                break;
              }
              case 'Months': {
                console.log('Months');
                rule = new RRule({
                  freq: RRule.MONTHLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.MONTHLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                break;
              }
              case 'Years': {
                console.log('Years');
                rule = new RRule({
                  freq: RRule.YEARLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      start.getFullYear(),
                      start.getMonth(),
                      start.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                rend = new RRule({
                  freq: RRule.YEARLY,
                  interval: this.oft,
                  dtstart: new Date(
                    Date.UTC(
                      end.getFullYear(),
                      end.getMonth(),
                      end.getUTCDate()
                    )
                  ),
                  until: new Date(
                    Date.UTC(
                      endRpt.getFullYear(),
                      endRpt.getMonth(),
                      endRpt.getUTCDate()
                    )
                  )
                });
                console.log(rule);
                break;
              }
              default: {
                if (this.mode === 2) {
                  rule = new RRule({
                    freq: RRule.MONTHLY,
                    byweekday: [this.dys.nth(this.wk)],
                    dtstart: new Date(
                      Date.UTC(
                        start.getFullYear(),
                        start.getMonth(),
                        start.getUTCDate()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getUTCDate()
                      )
                    )
                  });

                  rend = new RRule({
                    freq: RRule.MONTHLY,
                    byweekday: [this.dys.nth(this.wk)],
                    dtstart: new Date(
                      Date.UTC(
                        end.getFullYear(),
                        end.getMonth(),
                        end.getUTCDate()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getUTCDate()
                      )
                    )
                  });
                } else if (this.mode === 3) {
                  rule = new RRule({
                    freq: RRule.WEEKLY,
                    byweekday: this.dys2,
                    dtstart: new Date(
                      Date.UTC(
                        start.getFullYear(),
                        start.getMonth(),
                        start.getUTCDate()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getUTCDate()
                      )
                    )
                  });

                  rend = new RRule({
                    freq: RRule.WEEKLY,
                    byweekday: this.dys2,
                    dtstart: new Date(
                      Date.UTC(
                        end.getFullYear(),
                        end.getMonth(),
                        end.getUTCDate()
                      )
                    ),
                    until: new Date(
                      Date.UTC(
                        endRpt.getFullYear(),
                        endRpt.getMonth(),
                        endRpt.getUTCDate()
                      )
                    )
                  });
                }
              }
            }
          }

          const events = rule.all();
          const ends = rend.all();
          console.log(events);
          events.forEach((event, index) => {
            const date = new Date(event);
            const thisEnd = new Date(ends[index]);
            const newEvent = {
              color: this.color,
              name: this.title,
              start: !this.allDay
                ? date.toJSON().slice(0, 19)
                : date.toJSON().slice(0, 10),
              end: !this.allDay
                ? thisEnd.toJSON().slice(0, 19)
                : thisEnd.toJSON().slice(0, 10),
              allDay: this.allDay,
              location: this.location,
              details: this.desc
            };
            this.retVal.events.push(newEvent);
          });
        } else {
          this.retVal.events.push(event);
        }
        this.color = null;
        this.title = null;
        this.allDay = false;
        this.start = null;
        this.end = null;
        this.location = null;
        this.desc = null;
        this.amt = null;
        this.opt = null;
        this.dys = null;
        this.wk = null;
        this.dys2 = [];
        this.endRpt = '';
        this.repeat = false;
        this.$refs.form.resetValidation();
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.item = this.retVal.events.indexOf(event);
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    getEventColor(event) {
      return event.color;
    },
    getTextColor(event) {
      const brightness = Math.round((parseInt(event.color) * 299) / 1000);
      return brightness > 125 ? 'black' : 'white';
    },
    remove() {
      const index = this.retVal.events.indexOf(this.selectedEvent);
      this.retVal.events.splice(index, 1);
      this.selectedOpen = false;
    },
    edit() {
      this.editing = true;
      this.selectedOpen = false;
      this.color = this.selectedEvent.color;
      this.title = this.selectedEvent.name;
      this.start = this.selectedEvent.start;
      this.end = this.selectedEvent.end;
      this.allDay = this.selectedEvent.allDay;
      this.location = this.selectedEvent.location;
      this.desc = this.selectedEvent.details;
    },
    modify() {
      const event = {
        color: this.color,
        name: this.title,
        allDay: this.allDay,
        start: this.start,
        end: this.end,
        location: this.location,
        details: this.desc
      };
      const isValid = this.$refs.form.validate();
      if (isValid) {
        this.retVal.events.splice(this.item, 1, event);
        this.item = null;
        this.editing = false;
        this.allDay = false;
        this.color = null;
        this.title = null;
        this.start = null;
        this.end = null;
        this.location = null;
        this.desc = null;
        this.$refs.form.resetValidation();
      }
    },
    async clear() {
      if (
        !confirm(
          'Are you sure you want to delete all events before the current month?'
        )
      ) {
        return;
      }
      const date = new Date();
      const month = date.getMonth();
      const year = date.getFullYear();
      const remove = await this.retVal.events.filter(event => {
        const end = new Date(event.end);
        if (end.getMonth() < month && end.getFullYear() <= year) {
          return event;
        }
      });
      remove.forEach(event => {
        const index = this.retVal.events.indexOf(event);
        this.retVal.events.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="scss">
.calendar-comp {
  margin: 40px 0;

  .v-toolbar__content {
    flex-wrap: wrap;
  }
}
</style>
