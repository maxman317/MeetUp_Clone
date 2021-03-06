# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160812161035) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "events", force: :cascade do |t|
    t.integer  "group_id",    null: false
    t.string   "title",       null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.datetime "start_time",  null: false
    t.datetime "end_time",    null: false
  end

  add_index "events", ["group_id", "title"], name: "index_events_on_group_id_and_title", unique: true, using: :btree

  create_table "groups", force: :cascade do |t|
    t.string   "title",              null: false
    t.integer  "moderator_id",       null: false
    t.text     "description",        null: false
    t.string   "city",               null: false
    t.string   "state",              null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.decimal  "lat",                null: false
    t.decimal  "lng",                null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "groups", ["description"], name: "index_groups_on_description", using: :btree
  add_index "groups", ["title"], name: "index_groups_on_title", using: :btree

  create_table "memberships", force: :cascade do |t|
    t.integer  "member_id",  null: false
    t.integer  "group_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "memberships", ["group_id", "member_id"], name: "index_memberships_on_group_id_and_member_id", unique: true, using: :btree
  add_index "memberships", ["group_id"], name: "index_memberships_on_group_id", using: :btree
  add_index "memberships", ["member_id"], name: "index_memberships_on_member_id", using: :btree

  create_table "rsvps", force: :cascade do |t|
    t.integer  "event_id",   null: false
    t.integer  "user_id",    null: false
    t.boolean  "attending"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "rsvps", ["event_id", "user_id"], name: "index_rsvps_on_event_id_and_user_id", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",              null: false
    t.string   "username",           null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  add_foreign_key "events", "groups"
  add_foreign_key "groups", "users", column: "moderator_id"
  add_foreign_key "memberships", "groups"
  add_foreign_key "memberships", "users", column: "member_id"
  add_foreign_key "rsvps", "events"
  add_foreign_key "rsvps", "users"
end
