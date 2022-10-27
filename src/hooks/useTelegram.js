
const tg=window.Telegram.WebApp

export const useTelegram = () => {
    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
      if (tg.MainButton.isVisible){
          tg.MainButton.hide()
      }else {
          tg.MainButton.show()
      }
    }
console.log('tg',tg)
    return {
        tg,
        user:tg.initDataUnsafe?.user,
        queryId:tg.initDataUnsafe?.query_id,
        onClose,
        onToggleButton
    }
}