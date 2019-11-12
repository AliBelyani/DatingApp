using System;

namespace DatingApp.API.Utilities
{
    public static class DateTimeExtension
    {
        public static int CalculateAge(this DateTime date)
        {
            var age = DateTime.Today.Year - date.Year;
            if (date.AddYears(age) > DateTime.Today)
                age--;

            return age;
        }
    }
}