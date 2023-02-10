global using Xunit;
global using Moq;
global using AutoMapper;
global using Microsoft.Extensions.Logging;
global using System.Collections.Generic;
global using System;
global using Microsoft.AspNetCore.Mvc;

namespace Task_List_Backend
{
    public class Task_List_Backend
    {
        [Fact]
        public void AddTask_ShouldAddTaskToList()
        {
            // Arrange
            var taskList = new List<string>();

            // Act
            taskList.Add("Comprar leite");

            // Assert
            Assert.Single(taskList);
            Assert.Contains("Comprar leite", taskList);
        }

        [Fact]
        public void RemoveTask_ShouldRemoveTaskFromList()
        {
            // Arrange
            var taskList = new List<string> { "Comprar leite", "Pagar contas" };

            // Act
            taskList.Remove("Comprar leite");

            // Assert
            Assert.Single(taskList);
            Assert.DoesNotContain("Comprar leite", taskList);
        }
    }
}
