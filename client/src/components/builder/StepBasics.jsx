export default function StepBasics({ formData, setFormData }) {
  return (
    <>
      <h2 className="text-2xl font-bold">Basic Info</h2>

      <input
        placeholder="Full Name"
        className="input"
        value={formData.fullName}
        onChange={(e) =>
          setFormData({ ...formData, fullName: e.target.value })
        }
      />

      <input
        placeholder="Current Position"
        className="input"
        value={formData.currentPosition}
        onChange={(e) =>
          setFormData({
            ...formData,
            currentPosition: e.target.value,
          })
        }
      />

      <input
        type="number"
        placeholder="Years of Experience"
        className="input"
        value={formData.experienceYears}
        onChange={(e) =>
          setFormData({
            ...formData,
            experienceYears: e.target.value,
          })
        }
      />
    </>
  );
}