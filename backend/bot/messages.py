from inspect import cleandoc as _


class MessageBuilder():

    @staticmethod
    def start(first_name, admin_id):
        return _(
            f"""
            *🎉 Вітаємо, {first_name}! 🎉*

            Ви авторизувались у веб-застосунку практикуючого
            психолога [Лянного Андрія](tg://user?id={admin_id}).

            Всі ваші записи та налаштування акаунта можна 
            переглянути через панель керування бота.
            Нажміть на *меню* щоб відрити веб-застосунок.
            """
        )
    
    @staticmethod
    def welcome_back(first_name, admin_id):
        return _(
            f"""
            *🎉 З поверненням, {first_name}! 🎉*

            Ви авторизувались у веб-застосунку практикуючого
            психолога [Лянного Андрія](tg://user?id={admin_id}).

            Всі ваші записи та налаштування акаунта можна 
            переглянути через панель керування бота.
            Нажміть на *меню* щоб відрити веб-застосунок.
            """
        )
    

    @staticmethod
    def phone_verification():
        return _(
            f"""
            *📞 Надання номера телефона*

            
            Надайте номер телефона через меню. ⬇️⬇️⬇️

            *
            Через 5 хвилин, активація стане недоступною.
            При помилці/труднощах, зверніться до психолога.
            *
            """
        )
    

    @staticmethod
    def appointment_cancel(title):
        return _(
			f"""
			*📝 {title}*

			Консультація була відмінена
			"""
		)
    
    @staticmethod
    def appointment_update_user(title, online, status, formated_date, address=None, zoom_link=None):
        return _(
            f"""
            *📝 {title}*

            
            Дані про вашу консультацію були оновлені

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            📌 Статус: *{status}*
            🗓 Дата: *{formated_date}*
            """
        )
    
    @staticmethod
    def appointment_update_admin(title, online, status, formated_date, first_name, address=None, zoom_link=None):
        return _(
            f"""
            *📝 {title}*

            
            Дані про консультацію були оновлені

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            📌 Статус: *{status}*
            🗓 Дата: *{formated_date}*
            👤 Користувач: *{first_name}*
            """
        )
    
    @staticmethod
    def appointment_schedule_user(title, online, formated_date, address=None, zoom_link=None):
        return _(
            f"""
            *📝 {title}*

            
            *Ваша консультація незабаром розпочнеться.*

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*

            *При необхідності, зв'яжіться з психологом.*
            """
        )
    
    @staticmethod
    def appointment_schedule_admin(title, online, formated_date, first_name, address=None, zoom_link=None):
        return _(
            f"""
            *📝 {title}*

            
            Консультація незабаром розпочнеться.

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*
            👤 Користувач: *{first_name}*
            """
        )
    
    @staticmethod
    def event_schedule(title, formated_date, address=None, zoom_link=None):
        return _(
            f"""
            *🧷 {title}*

            
            Групова зустріч незабаром розпочнеться.

            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*
            """
        )
    
    @staticmethod
    def appointment_create_user(title, online, formated_date, address=None):
        return _(
            f"""
            *📝 Запис на консультацію*

            
            Ви створили запис на консультацію.

            📌 Назва: *{title}*
            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: *{address if address else "Міт у Zoom"}*
            🗓 Дата: *{formated_date}*

            *
            Очікуйте підтвердження психолога.
            *
            """
        )
    
    @staticmethod
    def appointment_create_admin(title, online, formated_date, first_name, address=None):
        return _(
            f"""
            *📝 Запис на консультацію*

            
            Створено новий запит на консультацію.

            📌 Назва: *{title}*
            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: *{address if address else "Міт у Zoom"}*
            🗓 Дата: *{formated_date}*
            👤 Користувач: *{first_name}*
            """
        )
    
    @staticmethod
    def appointment_admin_create_user(title, online, formated_date, address=None, zoom_link=None):
        return _(
            f"""
            *📝 Запис на консультацію*

            
            Психолог записав вас на консультацію.

            📌 Назва: *{title}*
            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*

            """
        )
    
    @staticmethod
    def appointment_admin_create_admin(title, online, formated_date, first_name, address=None, zoom_link=None):
        return _(
            f"""
            *📝 Запис на консультацію*

            
            Ви записали користувача на консультацію.

            📌 Назва: *{title}*
            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*
            👤 Користувач: *{first_name}*
            """
        )
    

    @staticmethod
    def phone_error():
        return _(
            f"""
            *❌ Виникла помилка*

            Час на верифікацію телефона вийшов, або
            були надані неправильні дані

            Спробуйте пізніше або зверніться до
            психолога за допомогою.
            """
        )
    
    @staticmethod
    def phone_server_error(error):
        return _(
            f"""
            *❌ Сервера помилка*

            {error}

            Спробуйте пізніше або зверніться до
            психолога за допомогою.
            """
        )
    
    @staticmethod
    def phone_ok():
        return _(
            f"""
            *✅ Успішно!*

            Тепер психолог зможе з вами зв'язати при
            необхідності обговорити питання щодо консультацій.

            *
            Ваше ім'я та номер телефона потрібні лише 
            для можливості зв'язку з психологом. 
            Конфіденційність ваших даних гарантована.
            *
            """
        )
    
    @staticmethod
    def settings(first_name, phone_number, notifications_on):
        return _(
            f"""
            *⚙️ Налаштування Особистого кабінета:*

            👤 Ім'я: *{first_name}*
            📞 Номер телефона: *{phone_number if phone_number else "Невідомий"}*
            🕒 Оповіщення: *{"🟢 Включені" if notifications_on else "🔴 Ввимкнені"}*

            *
            Ваше ім'я та номер телефона потрібні лише 
            для можливості зв'язку з психологом. 
            Конфіденційність ваших даних гарантована.
            *
            """
        )
    
    @staticmethod
    def menu():
        return _(
            f"""
            📇 Головне меню
            """
        )
    
    @staticmethod
    def notifications_off():
        return _(
            f"""
            *🔴 Вимкнуто!*

            Тепер бот *не буде* відправляти вам
            повідомлення про початок консультацій та
            групових зустрічей.
            """
        )
    
    @staticmethod
    def error():
        return _(
            f"""
            *❌ Виникла помилка*

            Спробуйте пізніше або зверніться до
            психолога за допомогою.
            """
        )
    
    @staticmethod
    def notifications_on():
        return _(
			f"""
			*🟢 Включено!*

			Тепер бот *буде* відправляти вам
			повідомлення про початок консультацій та
			групових зустрічей.
			"""
		)
    
    @staticmethod
    def phone_update():
        return _(
			f"""
			*📞 Оновлення номера телефона*

			Надайте номер телефона через меню. ⬇️⬇️⬇️

			*
			Через 5 хвилин, активація стане недоступною.
			При помилці/труднощах, зверніться до психолога.
			*
			"""
		)
    
    @staticmethod
    def phone_no_contact():
        return _(
            f"""
            *❌ Виникла помилка*

            Ви не надали свій контакт, або 
            наданий контакт не є дійсним.
            """
        )
    
    @staticmethod
    def phone_wrong_contact():
        return _(
            f"""
            *❌ Виникла помилка*

            Ви надали не свій контакт
            """
        )
    
    @staticmethod
    def phone_user_error():
        return _(
            f"""
            *❌ Виникла помилка*

            Користувач с таким контактом не існує.
            """
        )
    
    @staticmethod
    def site_link():
        return _(
            """
            https://psycholebedenko.online/

            Лянний Андрій- Особистий психолог. 
            Запис на індивідуальну психологічну консультацію в зручному форматі. Надання психологічної підтримки. Групові психологічні зустрічі. М. Миколаїв.

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def bot_link():
        return _(
            """
            [Телеграм бот](tg://resolve?domain=Psycholebedenko_bot)

            Запис на психологічні консультації та 
            групові зустрічі практикуючого психолога Лянного Андрія.

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_comand_error():
        return _(
            """
            *❌ Виникла помилка*
            
            Введена команда не відповідає необхідній структурі

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_date_error():
        return _(
            """
            *❌ Виникла помилка*
            
            Вже існує запис на цю дату

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_create(title, online, formated_date, first_name, address=None, zoom_link=None):
        return _(
            f"""
            *📝 Консультація*

            Створено нову консультацію.

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*
            👤 Ім'я клієнта: *{first_name}*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_create_pre(first_name):
        return _(
            f"""
            *⌛️ Створюю нову консультацію для {first_name}...*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_closest(title, online, formated_date, first_name, address=None, zoom_link=None):
        return _(
            f"""
            *📝 Консультація*

            📡 Формат: *{"Онлайн" if online else "Офлайн"}*
            📍 Місце проведення: {f"*{address}*" if address else f"[Міт у Zoom]({zoom_link})"}
            🗓 Дата: *{formated_date}*
            👤 Ім'я клієнта: *{first_name}*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_closest_decline(title):
        return _(
            f"""
            *📝 Консультація була відмінена*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_closest_not_exist():
        return _(
            f"""
            *📝 Не знайдено жодної консультації...*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_closest_complete(title):
        return _(
            f"""
            *📝 Консультація закінчена*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def appointment_bot_closest_new_link(title, zoom_link):
        return _(
            f"""
            *📝 Консультація*

            Оновлено: [посилання на зум]({zoom_link})

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def first_appointment_create(first_name, formated_date, zoom_link):
        return _(
            f"""
            *📝 Ознайомча консультація*

            📡 Формат: *Онлайн*
            📍 Місце проведення: [Міт у Zoom]({zoom_link})
            🗓 Дата: *{formated_date}*
            👤 Ім'я клієнта: *{first_name}*

            @Psycholebedenko\_bot 🤖
            """
        )
    
    @staticmethod
    def first_appointment_create_pre(first_name):
        return _(
            f"""
            *⌛️ Створюю ознайомчу консультацію для {first_name}...*

            @Psycholebedenko\_bot 🤖
            """
        )