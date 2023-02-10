using FluentValidation;
using Task_List_Backend.Models;

namespace Task_List_Backend.Validators
{
    public class UserTaskDTOValidator : AbstractValidator<UserTaskDTO>
    {
        public UserTaskDTOValidator()
        {
            RuleFor(x => x.TimeStart).NotEmpty().WithMessage("A data de início é obrigatória.");
            RuleFor(x => x.TimeEnd).NotEmpty().WithMessage("A data de fim é obrigatória.");
            RuleFor(x => x.Subject).NotEmpty().WithMessage("O assunto é obrigatório.");
            RuleFor(x => x.Description).NotEmpty().WithMessage("A descrição é obrigatória.");
            RuleFor(x => x.TimeEnd).GreaterThanOrEqualTo(x => x.TimeStart).WithMessage("A data de fim deve ser igual ou posterior à data de início.");
        }
    }
}
