<template>
  <v-container>

      <v-row class="mb-1 mt-1">
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="mx-auto" max-width="500">
            <v-list-item two-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  EMPLOYEE TOTAL
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ count_emp }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="160"
                ><v-icon size="160" color="green"
                  >mdi-account</v-icon
                ></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="mx-auto" max-width="500">
            <v-list-item two-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  EMPLOYEE ACTIVE
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ count_a_emp }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="160"
                ><v-icon size="160" :color="page_color"
                  >mdi-account</v-icon
                ></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </v-col>
        <v-col xl="4" lg="4" md="4" sm="12" cols="12">
          <v-card class="mx-auto" max-width="500">
            <v-list-item two-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  EMPLOYEE DEACTIVE
                </div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ count_d_emp }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-avatar tile size="160"
                ><v-icon size="160" color="red"
                  >mdi-account</v-icon
                ></v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

    <v-divider></v-divider>
    <v-card text>
      <v-card-title
        ><v-btn color="success" @click="show_Dialog_Add"
          >Add New Employee</v-btn
        >
      </v-card-title>

      <!-- employee title -->
      <v-card-title>
        <v-text-field
          v-model="search_employee"
          append-icon="search"
          label="Search by name or email only"
          single-line
          hide-details
          :color="page_color"
        ></v-text-field>
      </v-card-title>

      <!-- employee datatable -->
      <v-data-table
        :headers="header_employee"
        :items="employee_table"
        :search="search_employee"
        style="white-space: nowrap"
        class="elevation-1"
      >
        <!-- template alert when no-data -->
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            Sorry, nothing to display here :(
          </v-alert>
        </template>

        <!-- alert when search not found -->
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search_employee }}" found no results.
        </v-alert>

        <!-- template of actions function -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row justify="center">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  @click="show_Dialog_Edit(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="orange">
                    mdi-account-edit-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>แก้ไขรายละเอียด</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  @click="show_Dialog_Del(item)"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="red">
                    mdi-delete-outline
                  </v-icon>
                </v-btn>
              </template>
              <span>ลบ</span>
            </v-tooltip>
          </v-row>
        </template>
        <!-- lawyer tamplate -->
        <template v-slot:top>
          <!-- <v-toolbar text> -->

          <!-- dialog add -->
          <v-dialog v-model="dialog_add" scrollable width="1080px">
            <v-card>
              <!-- add title -->
              <v-card-title style="background-color: #313131; color:#FFFFFF;">
                <v-col xl="10" lg="10" md="10" sm="6" cols="6">
                  <span class="headline">ข้อมูลพนักงาน</span>
                </v-col>
              </v-card-title>

              <v-card-text>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-form ref="form_add" v-model="add_valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.username"
                          label="username"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.name"
                          label="name"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.email"
                          label="email"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.street"
                          label="street"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.suite"
                          label="suite"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.city"
                          label="city"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.zipcode"
                          label="zipcode"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.phone"
                          label="phone"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="add_item.website"
                          label="website"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <!-- view action -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="confirm_Add"
                  :disabled="!edit_valid"
                >
                  Save
                </v-btn>
                <v-btn color="blue darken-1" text @click="close_Dialog_Add">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- dialog edit -->
          <v-dialog v-model="dialog_edit" scrollable width="1080px">
            <v-card>
              <!-- edit title -->
              <v-card-title style="background-color: #313131; color:#FFFFFF;">
                <v-col xl="10" lg="10" md="10" sm="6" cols="6">
                  <span class="headline">ข้อมูลพนักงาน</span>
                </v-col>
              </v-card-title>

              <v-card-text>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-form ref="form_edit" v-model="edit_valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          disabled
                          :color="page_color"
                          v-model="edit_item.username"
                          label="username"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.name"
                          label="name"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.email"
                          label="email"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.street"
                          label="street"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.suite"
                          label="suite"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.city"
                          label="city"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.zipcode"
                          label="zipcode"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.phone"
                          label="phone"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                      <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                        <v-text-field
                          :color="page_color"
                          v-model="edit_item.website"
                          label="website"
                          :rules="nullrules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <!-- view action -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="orange darken-1"
                  text
                  @click="confirm_Edit"
                  :disabled="!edit_valid"
                >
                  Save
                </v-btn>
                <v-btn color="blue darken-1" text @click="close_Dialog_Edit">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- dialog del -->
          <v-dialog v-model="dialog_del" max-width="600px">
            <v-card>
              <v-card-title class="headline center"
                >คุณแน่ใจใช่ไหมว่าต้องการลบ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="confirm_Del">Confirm</v-btn>
                <v-btn color="blue darken-1" text @click="close_Dialog_Del"
                  >Close</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- </v-toolbar> -->
        </template>
      </v-data-table>
    </v-card>
    <v-overlay :value="overlay_page">
      <v-progress-circular
        indeterminate
        size="64"
        color="amber"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      count_emp: "",
      count_a_emp: "",
      count_d_emp: "",
      header_employee: [
        {
          text: "Actions",
          value: "actions",
          divider: true,
          sortable: false,
          width: "100px",
        },
        { text: "name", value: "name", filterable: true },
        { text: "username", value: "username", filterable: false },
        { text: "email", value: "email", filterable: true },
        { text: "street", value: "address.street", filterable: false },
        { text: "suite", value: "address.suite", filterable: false },
        { text: "city", value: "address.city", filterable: false },
        { text: "zipcode", value: "address.zipcode", filterable: false },
        { text: "phone", value: "phone", align: "center", filterable: false },
        {
          text: "website",
          value: "website",
          align: "center",
          filterable: false,
        },
      ],
      employee_table: [],
      // dialog add
      add_valid: true,
      dialog_add: false,
      add_item: [],
      // dialog edit
      edit_valid: true,
      dialog_edit: false,
      // edit_item: [{
      //   name:"",
      //   username:"",
      //   email:"",
      //   address: {street:"",suite:"",city:"",zipcode:""},
      //   phone:"",
      //   website:"",
      //   }
      // ],
      edit_item: [],
      // dialog del
      dialog_del: false,
      del_item: [],
      search_employee: "",
      page_color: "#EC7531",
      overlay_page: false,
      //rules
      nullrules: [(v) => !!v || "This field is required"],
    };
  },
  created() {
    document.title = "seekster employee";
    this.count_employee();
    this.emp_table();
  },
  mounted() {},
  methods: {
    count_employee() {
      this.overlay_page = true;
      var config = {
        method: "get",
        url: "http://localhost:3000/count_employee",
      };
      var self = this;

      Axios(config)
        .then(function(response) {
          // console.log(response.data.res_data[0].C_EMP);
          self.count_emp = response.data.res_data[0].C_EMP;
        })
        .catch(function(error) {
          console.log(error);
        });

      var config_a = {
        method: "get",
        url: "http://localhost:3000/count_employee_active",
      };

      Axios(config_a)
        .then(function(response) {
          // console.log(response.data.res_data[0].C_EMP);
          self.count_a_emp = response.data.res_data[0].C_EMP;
        })
        .catch(function(error) {
          console.log(error);
        });
      var config_d = {
        method: "get",
        url: "http://localhost:3000/count_employee_deactive",
      };

      Axios(config_d)
        .then(function(response) {
          // console.log(response.data.res_data[0].C_EMP);
          self.count_d_emp = response.data.res_data[0].C_EMP;
          self.overlay_page = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    emp_table() {
      this.overlay_page = true;
      var config = {
        method: "get",
        url: "http://localhost:3000/employee",
      };
      var self = this;
      self.employee_table = [];

      Axios(config)
        .then(function(response) {
          self.employee_table = response.data.employee_data;
          self.overlay_page = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //dialog add
    show_Dialog_Add() {
      this.dialog_add = true;
    },
    confirm_Add() {
      this.overlay_page = true;

      if (
        this.add_item.name == undefined ||
        this.add_item.username == undefined ||
        this.add_item.email == undefined ||
        this.add_item.street == undefined ||
        this.add_item.suite == undefined ||
        this.add_item.city == undefined ||
        this.add_item.zipcode == undefined ||
        this.add_item.phone == undefined ||
        this.add_item.website == undefined
      ) {
        this.$refs.form_add.validate();
        this.$notify({
          type: "error",
          text: "Please insert field is required",
        });
        this.overlay_page = false;
        return;
      }

      var data = {
        name: this.add_item.name,
        username: this.add_item.username,
        email: this.add_item.email,
        street: this.add_item.street,
        suite: this.add_item.suite,
        city: this.add_item.city,
        zipcode: this.add_item.zipcode,
        phone: this.add_item.phone,
        website: this.add_item.website,
      };

      var config = {
        method: "post",
        url: "http://localhost:3000/insert_employee",
        data: data,
      };
      var self = this;
      self.res = [];
      Axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data);

          if (response.data == "OK") {
            self.res = response.data;
            self.$notify({
              type: "success",
              text: "Add Completed",
            });
            self.count_employee();
            self.emp_table();
            self.$refs.form_add.reset();
            self.dialog_add = false;
            self.overlay_page = false;
          } else if (response.data == "Please insert data!" || response.data == "data not string!" ) {
            self.$notify({
              type: "error",
              text: response.data,
            });
            self.overlay_page = false;
          } else {
            self.overlay_page = false;
            alert("Error");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close_Dialog_Add() {
      this.dialog_add = false;
    },
    //dialog edit
    show_Dialog_Edit(item) {
      this.edit_item = Object.assign({}, item, item.address);
      this.dialog_edit = true;
    },
    confirm_Edit() {
      this.overlay_page = true;

      if (
        this.edit_item.name == undefined ||
        this.edit_item.username == undefined ||
        this.edit_item.email == undefined ||
        this.edit_item.street == undefined ||
        this.edit_item.suite == undefined ||
        this.edit_item.city == undefined ||
        this.edit_item.zipcode == undefined ||
        this.edit_item.phone == undefined ||
        this.edit_item.website == undefined
      ) {
        this.$refs.form_edit.validate();
        this.$notify({
          type: "error",
          text: "Please insert field is required",
        });
        this.overlay_page = false;
        return;
      }

      var data = {
        name: this.edit_item.name,
        username: this.edit_item.username,
        email: this.edit_item.email,
        street: this.edit_item.street,
        suite: this.edit_item.suite,
        city: this.edit_item.city,
        zipcode: this.edit_item.zipcode,
        phone: this.edit_item.phone,
        website: this.edit_item.website,
      };

      var config = {
        method: "post",
        url: "http://localhost:3000/edit_employee",
        data: data,
      };
      var self = this;
      self.res = [];
      Axios(config)
        .then(function(response) {
          // console.log(JSON.stringify(response));
          console.log(response.data);

          if (response.data == "OK") {
            self.res = response.data;
            self.$notify({
              type: "success",
              text: "Edit Completed",
            });
            self.count_employee();
            self.emp_table();
            self.dialog_edit = false;
            self.overlay_page = false;
          }  else if (response.data == "Please insert data!" || response.data == "data not string!" ) {
            self.$notify({
              type: "error",
              text: response.data,
            });
            self.overlay_page = false;
            } else {
            self.overlay_page = false;
            alert("Error");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close_Dialog_Edit() {
      this.dialog_edit = false;
    },
    //dialog delete
    show_Dialog_Del(item) {
      this.del_item = Object.assign({}, item);
      this.dialog_del = true;
    },
    confirm_Del() {
      var data = {
        username: this.del_item.username,
      };

      var config = {
        method: "post",
        url: "http://localhost:3000/delete_employee",
        data: data,
      };
      var self = this;
      self.res = [];
      Axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));

          if (response.data == "OK") {
            self.res = response.data;
            self.$notify({
              type: "success",
              text: "Delete Completed",
            });
            self.count_employee();
            self.emp_table();
            self.dialog_del = false;
          } else if (response.data == "Please insert data!" || response.data == "data not string!" ) {
            self.$notify({
              type: "error",
              text: response.data,
            });
            self.overlay_page = false;
            } else {
            alert("Error");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close_Dialog_Del() {
      this.dialog_del = false;
    },
  },
};
</script>
