import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>

      <div className='shadow-xl w-96 mx-auto p-6 rounded-xl text-center border border-heading'>
        <form className='mx-auto w-52' onSubmit={handleSubmit}  >
          <input type='text' value={value} onChange={e => setValue(e.target.value)}
            placeholder='Enter Category'
            className='border-b-[1px] text-center p-2 border-darkblue'
          ></input><br /><br />
          <button className='text-heading bg-darkblue rounded-2xl w-28' >Save</button>
        </form>
      </div>

    </>
  );
};

export default CategoryForm;