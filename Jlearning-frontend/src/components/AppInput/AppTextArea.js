
const AppTextArea = ({ placeholder, value, handleChangeValue, title, height }) => {
  return <>

    <div className="w-full">
      <div className="relative w-full">
        <textarea
          value={value}
          className={`peer ${height}  w-full resize-none rounded-[7px] border `}
          placeholder={placeholder}
          onChange={(e) => handleChangeValue(title, e.target.value)}

        ></textarea>

      </div>
    </div>

  </>
}

export default AppTextArea;