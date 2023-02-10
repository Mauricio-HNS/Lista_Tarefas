using FluentValidation;
using Task_List_Backend.Models;

namespace Task_List_Backend.Validators
{
    public class UserTaskDTOValidator : AbstractValidator<UserTaskDTO>
    {
        public UserTaskDTOValidator()
        {
            RuleFor(x => x.TimeStart).NotEmpty().WithMessage("A data de in�cio � obrigat�ria.");
            RuleFor(x => x.TimeEnd).NotEmpty().WithMessage("A data de fim � obrigat�ria.");
            RuleFor(x => x.Subject).NotEmpty().WithMessage("O assunto � obrigat�rio.");
            RuleFor(x => x.Description).NotEmpty().WithMessage("A descri��o � obrigat�ria.");
            RuleFor(x => x.TimeEnd).GreaterThanOrEqualTo(x => x.TimeStart).WithMessage("A data de fim deve ser igual ou posterior � data de in�cio.");
        }
    }
}
