from telebot.types import ReplyKeyboardMarkup, KeyboardButton


menu_markup = ReplyKeyboardMarkup(
    resize_keyboard=True,
    row_width=1,
).add(
    KeyboardButton("1"), 
    KeyboardButton("2"),
    KeyboardButton("3"),
)

phone_verification_markup = ReplyKeyboardMarkup(
    resize_keyboard=True,
    row_width=1
).add(
    KeyboardButton("Надати номер телефону", request_contact=True),
    KeyboardButton("Меню")
)