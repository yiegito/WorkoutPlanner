export const SelectBox = ({selectedGroup, handleSelectChange}) =>{
    const selection = [
        {id: 0,group: "All Workouts"},
        {id: 1,group: "Chest"},
        {id:2,group: "Back"},
        {id:3,group: "Biceps"},
        {id:4,group: "Triceps"},
        {id:5,group: "Shoulders"},
        {id:6,group: "Legs"}
        
    ]
    const handleChange = (e) => {
        const selectedValue = e.target.value;
        handleSelectChange(selectedValue);
      };
    return (
        <>
          <select value={selectedGroup} onChange={handleChange}>
            {selection.map((selections) => (
              <option key={selections.id} value={selections.group}>
                {selections.group}
              </option>
            ))}
          </select>
        </>
    )
}