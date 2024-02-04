import InputForm from "@/app/components/InputForm";
import { OptionType } from "@/app/models/OptionType";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { selectStyles } from "../../StylesSelect";
type Props = {
  method: any;
  optionsSubcategory: OptionType[];
  optionsCategory: OptionType[];
  optionsBrands: OptionType[];
};
export default function InformationProduct({
  method,
  optionsSubcategory,
  optionsCategory,
  optionsBrands,
}: Props) {
  const {
    control,
    formState: { errors, isSubmitting, isValid },
  } = method;
  const classnameInputs = "border border-green-principal p-1 rounded-md w-full";

  return (
    <section
      id="load-information-product"
      className="flex flex-col justify-center items items-start gap-2"
    >
      <div className="fle w-full">
        <InputForm
          type="text"
          name={"name"}
          control={control}
          required
          errors={errors}
          className={"border border-green-principal p-1 rounded-md w-full"}
          placeholder="Titulo"
        />
      </div>
      <div
        className="flex flex-col lg:flex-row justify-between w-full lg:items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Controller
          name="brand"
          rules={{ required: "Campo requerido" }}
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isClearable
              options={optionsBrands as any}
              className="w-44"
              placeholder="Marca"
              value={optionsBrands.find((c) => c.value === field.value)}
              onChange={(val) => {
                field.onChange(val);
              }}
              styles={selectStyles(errors.brand)}
            />
          )}
        />

        <Controller
          name="category"
          rules={{ required: "Campo requerido" }}
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isClearable
              options={optionsCategory as any}
              className="w-44"
              placeholder="Categoría"
              value={optionsCategory.find((c) => c.value === field.value)}
              onChange={(val) => field.onChange(val)}
              styles={selectStyles(errors.category)}
            />
          )}
        />
        <Controller
          name="subcategory"
          control={control}
          rules={{ required: "Campo requerido" }}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isClearable
              options={optionsSubcategory as any}
              className="w-44"
              placeholder="Subcategoría"
              value={optionsSubcategory.find((c) => c.value === field.value)}
              onChange={(val) => field.onChange(val)}
              styles={selectStyles(errors.subcategory)}
            />
          )}
        />
      </div>

      <div className="flex flex-col lg:flex-row  justify-betweven w-full gap-4">
        <div className="w-full">
          <InputForm
            type="textarea"
            name={"description"}
            control={control}
            required
            errors={errors}
            className={classnameInputs}
            placeholder="Descripción"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  justify-between w-full gap-4  items-start">
        <div className="w-2/4 flex gap-4">
          <InputForm
            type="number"
            name={"price"}
            control={control}
            required
            errors={errors}
            className={classnameInputs}
          />
          <InputForm
            type="number"
            name={"stock"}
            control={control}
            required
            errors={errors}
            className={classnameInputs}
          />
        </div>
      </div>
    </section>
  );
}
