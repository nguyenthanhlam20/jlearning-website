
const AppInputCurrency = ({disabled,placeholder, value, handleChangeValue, title, height }) => {
    const handleInputChange = (e) => {
        let inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters

        const formattedValue = new Intl.NumberFormat('vi-VN').format(Number(numericValue)) + '₫';
        handleChangeValue(title, formattedValue);
      };
    return <>
      <div className="w-full" >
        <div className="relative h-10 w-full p-0">
          <input
            className={`peer ${height} h-full  w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-2 disabled:border-blue-500 disabled:border-t-transparent disabled:outline-0 `}
            placeholder=" "
            value={value}
            disabled={disabled}
            onChange={handleInputChange}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 0 peer-disabled:text-[11px] peer-disabled:leading-tight peer-disabled:text-blue-500 peer-disabled:before:border-t-2 peer-disabled:before:border-l-2 peer-disabled:before:border-blue-500 peer-disabled:after:border-t-2 peer-disabled:after:border-r-2 peer-disabled:after:border-blue-500">
            {placeholder}
          </label>
        </div>
      </div></>
  }
  
  export default AppInputCurrency;