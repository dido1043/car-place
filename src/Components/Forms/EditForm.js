import React from "react";
function EditForm() {
    return (
        <div>
            <form>

                <Label text="Brand" />
                <InputField value={carFormData.make} name="make"
                    onChange={handleChange} placeholder="Brand" type="text" error={errors.make} />
                <Label text="Model" />
                <InputField value={carFormData.model} name="model"
                    onChange={handleChange} placeholder="Model" type="text" error={errors.model} />
                <Label text="Year" />
                <InputField value={carFormData.year} name="year"
                    onChange={handleChange} placeholder="Year" type="text" error={errors.year} />
                <Label text="Price" />
                <InputField value={carFormData.price} name="price"
                    onChange={handleChange} placeholder="Price" type="text" error={errors.price} />
                <Label text="Image URL" />
                <InputField value={carFormData.imageUrl} name="imageUrl"
                    onChange={handleChange} placeholder="ImageUrl" type="text" error={errors.imageUrl} />
                <BaseButton text="Submit" type="submit" />
            </form>
        </div>

    )
}
export default EditForm;