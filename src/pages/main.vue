<template>
  <div class="about">
    <h1>Správa</h1>
    <div class="optInput" v-for="(input, i) in inputs" :key="i">
      <transition name="inputFade">
        <b-input-group v-if="input.visible">
          <b-form-input
            :id="`id${i}`"
            v-model="input.data"
            type="text"
            required
            placeholder="Zadejte otázku"
          ></b-form-input>
          <b-input-group-append>
            <b-button variant="danger" @click="removeInput(i)">Odebrat</b-button>
          </b-input-group-append>
        </b-input-group>
      </transition>
    </div>

    <b-button @click="addInput" class="mbutton" variant="outline-primary">Přidat otázku</b-button>
    <b-button @click="save" variant="primary">Uložit</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: [{ data: "lol", visible: false }],
      newQuestions: []
    };
  },
  methods: {
    addInput() {
      this.inputs.push({
        data: "",
        visible: false
      });
      setTimeout(() => {
        this.inputs[this.inputs.length - 1].visible = true;
      }, 50);
    },
    removeInput(i) {
      this.inputs.splice(i, 1);
    },
    save() {
      this.$alert
        .fire({
          title: "Jste si jist(a)?",
          text: "Při uložení otázek předchozí už nelze vrátit.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ano, uložit!"
        })
        .then(result => {
          if (result.value) {
            this.newQuestions = [];

            this.inputs.map(input => {
              return this.newQuestions.push(input.data);
            });
            let userCreds = JSON.parse(localStorage.getItem("userCreds"));
            this.$axios
              .post("https://quvia.cz:3000/", {
                type: "setQuestions",
                username: userCreds.username,
                password: userCreds.password,
                questions: this.newQuestions
              })
              .catch(function(error) {
                console.log(error);
              })
              .then(response => {
                if (response.data.success) {
                  this.$alert.fire({
                    title: "Uloženo",
                    icon: "success",
                    html: "Otázky se zobrazí na studentům."
                  });
                }
                this.getQuestions();
              });
          }
        });
    },
    getQuestions() {
      setTimeout(() => {
        this.inputs = [];
        this.$axios
          .post("https://quvia.cz:3000/", {
            type: "getQuestions"
          })
          .catch(function(error) {
            console.log(error);
          })
          .then(response => {
            response.data.questions.map(q => {
              return this.inputs.push({
                data: q,
                visible: false
              });
            });
            setTimeout(() => {
              for (let i = 0; i < this.inputs.length; i++) {
                setTimeout(() => {
                  this.inputs[i].visible = true;
                }, 150 * (i + 1));
              }
            }, 100);
          });
      }, this.inputs.length * 150);
    }
  },
  mounted() {
    this.getQuestions();
  }
};
</script>

<style lang="scss">
h1 {
  margin-bottom: 3%;
}
$inpWidth: 25%;
.optInput {
  width: $inpWidth;
  margin: auto;
  margin-bottom: 1%;
}
@media only screen and (max-width: 1270px) {
  /* For mobile phones: */
  .optInput {
    width: $inpWidth * 2;
  }
}
@media only screen and (max-width: 950px) {
  /* For mobile phones: */
  .optInput {
    width: $inpWidth * 2.5;
  }
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .optInput {
    width: 87%;
  }
}

.inputFade-enter-active {
  transition: width 1s, height 1s, opacity 1s;
}

.inputFade-leave-active {
  transition: width 1s, height 1s, display 1s opacity 1s 1s;
}

.inputFade-enter,
.inputFade-leave-to {
  opacity: 0;
}

.mbutton {
  margin-right: 0.5%;
}
</style>
